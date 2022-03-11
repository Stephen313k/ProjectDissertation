from venv import create
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden

from quiz.forms import NewQuizForm, NewQuestionForm
from quiz.models import Answer, Question, Quizzes, Attempter, Attempt
from module.models import Module
# Create your views here.

#pass in module id to add to module
def NewQuiz(request, module_id):
    user = request.user
    module = get_object_or_404(Module, id=module_id)
    if request.method == 'POST':
        form = NewQuestionForm(request.POST)
        if form.is_valid():
            #from forms
            title = form.cleaned_data.get('title')
            description = form.cleaned_data.get('description')
            due = form.cleaned_data.get('due')
            allowed_attempts = form.cleaned_data.get('allowed_attempts')
            time_limit_mins = form.cleaned_data.get('time_limit_mins')
            #create quiz with data above
            quiz = Quizzes.objects.create(title=title, description=description, due=due, allowed_attempts=allowed_attempts, time_limit_mins=time_limit_mins)
            module.quizzes.add(quiz)
            module.save()
            return redirect('new-question', quiz_id=quiz.id)
    else:
        form = NewQuizForm()
    context = {
        'form': form,
    }
    
    return render(request, 'quiz/newquiz.html', context)

def NewQuestion(request, quiz_id):
    user = request.user
    quiz = get_object_or_404(Quizzes, id=quiz_id)
    if request.method == 'POST':
        form = NewQuestionForm(request.POST)
        if form.is_valid():
            question_text = form.cleaned_data.get('question_text')
            points = form.cleaned_data.get('points')
            #getting list of answers
            answer_text = request.POST.getlist('answer_text')
            is_correct = request.POST.getlist('answer_text')

            question = Question.objects.create(question_text=question_text, user=user, points=points)

            #takes two lists, returns tuple and compares 
            # iterate through answers, and correct
            for a, c in zip(answer_text, is_correct):
                answer = Answer.object.create(answer_text=a, is_correct=c, user=user)
                #assign new answer to question
                question.answers.add(answer)
                question.save()
                quiz.questions.add(question)
                quiz.save()
            return redirect('new-question', quiz_id=quiz.id)
    else:
        form = NewQuestionForm()
    
    context = {
        'form': form,
    }
    return render(request, 'quiz/newquestion.html', context)

def QuizDetail(request, quiz_id):
    user = request.user
    quiz = get_object_or_404(Quizzes, id=quiz_id)
    my_attempts = Attempter.objects.filter(quiz=quiz, user=user)

    context = {
        'quiz': quiz,
        'my_attempts': my_attempts,
    }
    return render(request, 'quiz/quizdetail.html', context)

#in the quiz page, take quiz
def TakeQuiz(request, quiz_id):
    quiz = get_object_or_404(Quizzes, id=quiz_id)
    context = {
        'quiz': quiz,
    }
    return render(request, 'quiz/takequiz.html', context)
