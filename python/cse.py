import requests
from requests import Response
from bs4 import BeautifulSoup
from bs4 import NavigableString, Tag
from enum import Enum


courses = ['cse121', 'cse122', 'cse123', 'cse331']
URL = 'https://www.cs.washington.edu/education/courses/'
session = requests.Session()


course: str
for course in courses:
  res: Response = session.get(URL + course)
  parsed_res = BeautifulSoup(res.text, 'html.parser')
  menu = parsed_res.find('li', class_ = "first")
  # print(menu)
  ref = menu.find('a', href=True)
  website_link = URL + ref['href'][3:]
  print(website_link)
