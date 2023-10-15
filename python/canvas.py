#!/usr/bin/env python

import requests
from requests import Response

# use your own token
OAuth_token = "token"
BASE_URI = "https://canvas.instructure.com"

def get_assignments():
  # first api call gets all courses
  res: Response = requests.get(BASE_URI + "/api/v1/courses?enrollment_state=active&access_token=" + OAuth_token)
  html: str = ""
  for course in res.json():
    if "name" in course:
      html = html + "<h1>" + course["name"] + "<h1>"
      if "id" in course:
        # second api call gets all assignments in one course
        asses: Response = requests.get(BASE_URI + "/api/v1/courses/" + str(course["id"]) + "/assignments?access_token=" + OAuth_token)
        if asses.status_code == 200:
          for ass in asses.json():
            if "description" in ass:
              response = ass["description"]
              if response:
                html += response
        else:
          print("error")
  return html

# might take a few seconds
print(get_assignments())