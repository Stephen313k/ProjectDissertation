from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden

from page.models import Page, PostFileContent
from classroom.models import Course
from module.models import Module
# Create your views here.
from page.forms import NewPageForm

@login_required
def NewPageModule(request, course_id, module_id):
    user = request.user
    course = get_object_or_404(Course, id=course_id)
    module = get_object_or_404(Course, id=module_id)
    files_objs = []
    #has to be correct account
    if user != course.user:
        return HttpResponseForbidden()
    else:
        if request.method == 'POST':
            form = NewPageForm(request.POST, request.Files)
            if form.is_valid():
                title = form.get_data.get('title')
                content = form.get_data.get('title')
                files = request.FILES.getlist('files')

                #iterator mulitple the files
                for file in files:
                    file_instance = PostFileContent(file=file, user=user)
                    file_instance.save()
                    files_objs.append(file_instance)
                
                #new page
                p = Page.objects.create(title=title, content=content, user=user)
                p.files.set(files_objs)
                p.save()
                #add page to module
                module.pages.add(p)
                return redirect('my-courses')
            else:
                form = NewPageForm()
        context = {
            'form': form,
        }
    return render(request, 'page/newpage.html', context)

def PageDetail(request, course_id, module_id, page_id):
    page = get_object_or_404(Page, id=page_id)

    context = {
        'page': page, 
    }
    return render(request, 'page/page.html', context)

#def MarkPageAsDone(request, course_id, page_id):
