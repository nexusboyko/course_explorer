# pyscope is a webscraper made for gradescope
# it was not a package so i had to add it manually
from pyscope import pyscope
# pip install bs4
from bs4 import BeautifulSoup, Tag

session = pyscope.GSConnection()
email = ''
password = ''

login_success = session.login(email, password)

# the given function get_account did not work so i had to change it
courses: list[Tag] = session.get_account_alt()
print(courses)
for course in courses:
  if course:
    print(course.get_text())
