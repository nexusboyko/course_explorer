import requests
from requests import Response
from bs4 import BeautifulSoup
from bs4 import NavigableString, Tag
from enum import Enum
# <<<<<<< HEAD
import json
# =======
# import xmltojson
# import json

# >>>>>>> 7ff2cc844c57e99a22cb253f08c3916444120be1

# courses = ['cse312', 'cse331']
# URL = 'https://www.cs.washington.edu/education/courses/'

# files_312 = ["slides", "sections", "homework"]
# files_331 = ["lectures", "section", "hw"]

# URL_312 = "https://courses.cs.washington.edu/courses/cse312/23au/"
# URL_331 = "https://courses.cs.washington.edu/courses/cse331/23au/"

courses = [
    {
        "name": "CSE 312",
        "files": [
            # "slides",
            # "sections",
            "homework"
            ],
        "url": "https://courses.cs.washington.edu/courses/cse312/23au/",
    },
    {
        "name": "CSE 331",
        "files": [
            # "lectures", 
            # "sections",
            "hw"
            ],
        "url": "https://courses.cs.washington.edu/courses/cse331/23au/",
    },
]

session = requests.Session()

result = {}


course: {"name": str, "files": [str], "url": str}
for course in courses:
# <<<<<<< HEAD
    x = {}
    file: str
    for file in course["files"]:
        url = course["url"]
        # print(url)

        res: Response = session.get(url + file)
        parsed_res = BeautifulSoup(res.text, "html.parser")

        menu = parsed_res.find("table")
        links = menu.find_all("a", href=True)

        list = []
        for (i, l) in enumerate(links):
            list.append({"id": i, "name": l.text, "html_url": url + file + "/" + l["href"] + ""})
            x[file] = list[5:]
        
        # print(list)

    result[course["name"]] = x

json_str = json.dumps(result)
print(json_str)


# =======
#   res: Response = session.get(URL + course)
#   parsed_res = BeautifulSoup(res.text, 'html.parser')
  
#   menu = parsed_res.find('li', class_ = "first")
#   # print(menu)
#   ref = menu.find('a', href=True)
#   website_link = URL + ref['href'][3:]
#   print(website_link)
  

# #takes course link and goes to the assignement page
#   classPage: Response = session.get(website_link)
#   soup = BeautifulSoup(classPage.content,'html.parser')
#   assLink = soup.findAll('a', class_='nav-link')

#   #course sites aren't uniform(331 homework html is in a different spot)
#   try:
#     assPage = assLink[2]['href']
#   except IndexError:
#     break

# #gets the assignment info from page(theres probably a better way to do this)
#   page = requests.get(assPage)
#   soup = BeautifulSoup(page.content,'html.parser')
#   hws = soup.find_all("div", class_='homeworks')

#   #give button link to actual assignment 
#   details = soup.find("a", class_="btn btn-373")
#   courseName = soup.find("a").find(text=True, recursive=False)
#   print(courseName)
#   print(details)


#   for hw in hws:
#    deadlines = hw.find_all("b")
#    for deadline in deadlines:
     
#      #assignment deadline
#      print(deadline)

#    for name in hw.find_all("h5",class_="card-header"):
#      for i in name:
#       #assignment name
#       print(i)
#   print()
    


  

  


# """""
# url = "https://courses.cs.washington.edu/courses/cse122/23au/"

# page: Response = session.get(url)
# soup = BeautifulSoup(page.content,'html.parser')
# row = soup.findAll('a', class_='nav-link')
# ass = row[2]['href']

# page = requests.get(ass)
# soup = BeautifulSoup(page.content,'html.parser')
# hws = soup.find_all("div", class_='homeworks')
# for hw in hws:
#   print(hw)
# """

# >>>>>>> 7ff2cc844c57e99a22cb253f08c3916444120be1
