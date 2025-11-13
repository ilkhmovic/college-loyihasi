from django import forms
from .models import Courses, SessionYearModel


class DateInput(forms.DateInput):
    input_type = "date"


class AddStudentForm(forms.Form):
    email = forms.EmailField(label="Email",
                             max_length=50,
                             widget=forms.EmailInput(attrs={"class":"form-control"}))
    password = forms.CharField(label="Password",
                               max_length=50,
                               widget=forms.PasswordInput(attrs={"class":"form-control"}))
    first_name = forms.CharField(label="First Name",
                                 max_length=50,
                                 widget=forms.TextInput(attrs={"class":"form-control"}))
    last_name = forms.CharField(label="Last Name",
                                max_length=50,
                                widget=forms.TextInput(attrs={"class":"form-control"}))
    username = forms.CharField(label="Username",
                               max_length=50,
                               widget=forms.TextInput(attrs={"class":"form-control"}))
    address = forms.CharField(label="Address",
                              max_length=50,
                              widget=forms.TextInput(attrs={"class":"form-control"}))
    
    gender_list = (
        ('Male','Male'),
        ('Female','Female')
    )
    
    # Bo'sh ro'yxatlarni yaratamiz
    course_list = []
    session_year_list = []

    course_id = forms.ChoiceField(label="Course",
                                  choices=course_list,
                                  widget=forms.Select(attrs={"class":"form-control"}))
    gender = forms.ChoiceField(label="Gender",
                               choices=gender_list,
                               widget=forms.Select(attrs={"class":"form-control"}))
    session_year_id = forms.ChoiceField(label="Session Year",
                                        choices=session_year_list,
                                        widget=forms.Select(attrs={"class":"form-control"}))
    profile_pic = forms.FileField(label="Profile Pic",
                                  required=False,
                                  widget=forms.FileInput(attrs={"class":"form-control"}))

    def __init__(self, *args, **kwargs):
        super(AddStudentForm, self).__init__(*args, **kwargs)
        
        # Ma'lumotlar bazasi so'rovlarini __init__ ichida bajaramiz
        try:
            courses = Courses.objects.all()
            for course in courses:
                single_course = (course.id, course.course_name)
                self.fields['course_id'].choices.append(single_course)
        except:
            self.fields['course_id'].choices = []
        
        try:
            session_years = SessionYearModel.objects.all()
            for session_year in session_years:
                single_session_year = (session_year.id, str(session_year.session_start_year)+" to "+str(session_year.session_end_year))
                self.fields['session_year_id'].choices.append(single_session_year)
        except:
            self.fields['session_year_id'].choices = []


class EditStudentForm(forms.Form):
    email = forms.EmailField(label="Email",
                             max_length=50,
                             widget=forms.EmailInput(attrs={"class":"form-control"}))
    first_name = forms.CharField(label="First Name",
                                 max_length=50,
                                 widget=forms.TextInput(attrs={"class":"form-control"}))
    last_name = forms.CharField(label="Last Name",
                                max_length=50,
                                widget=forms.TextInput(attrs={"class":"form-control"}))
    username = forms.CharField(label="Username",
                               max_length=50,
                               widget=forms.TextInput(attrs={"class":"form-control"}))
    address = forms.CharField(label="Address",
                              max_length=50,
                              widget=forms.TextInput(attrs={"class":"form-control"}))

    # Bo'sh ro'yxatlarni yaratamiz
    course_list = []
    session_year_list = []

    gender_list = (
        ('Male','Male'),
        ('Female','Female')
    )
    
    course_id = forms.ChoiceField(label="Course",
                                  choices=course_list,
                                  widget=forms.Select(attrs={"class":"form-control"}))
    gender = forms.ChoiceField(label="Gender",
                               choices=gender_list,
                               widget=forms.Select(attrs={"class":"form-control"}))
    session_year_id = forms.ChoiceField(label="Session Year",
                                        choices=session_year_list,
                                        widget=forms.Select(attrs={"class":"form-control"}))
    profile_pic = forms.FileField(label="Profile Pic",
                                  required=False,
                                  widget=forms.FileInput(attrs={"class":"form-control"}))

    def __init__(self, *args, **kwargs):
        super(EditStudentForm, self).__init__(*args, **kwargs)
        
        # Ma'lumotlar bazasi so'rovlarini __init__ ichida bajaramiz
        try:
            courses = Courses.objects.all()
            for course in courses:
                single_course = (course.id, course.course_name)
                self.fields['course_id'].choices.append(single_course)
        except:
            self.fields['course_id'].choices = []
        
        try:
            session_years = SessionYearModel.objects.all()
            for session_year in session_years:
                single_session_year = (session_year.id, str(session_year.session_start_year)+" to "+str(session_year.session_end_year))
                self.fields['session_year_id'].choices.append(single_session_year)
        except:
            self.fields['session_year_id'].choices = []