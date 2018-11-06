from user.models import Department,College
file = open('courses.txt','r',encoding='UTF-8')
datas = file.readlines()
for data in datas:
	data = data.split('\t')
	colle = College.objects.filter(name=data[0])
	if(colle.count()==0):
		colle = College(name=data[0])
		colle.save()
	else:
	    colle = colle[0]
	depart = Department.objects.filter(name=data[1])
	if(depart.count()==0):
		depart = Department(name=data[1],college=colle)
		depart.save()
