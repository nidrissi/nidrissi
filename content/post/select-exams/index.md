---
title: "Select-Exams.ps1: a script to extract exams from a multi-page PDF"
date: 2021-04-19
lastMod: 2021-04-30
tags: [code, class]
urls:
  source: https://gist.github.com/nidrissi/a802dc0a20ecad0bc8c077ce32b6ad92
localImages:
  - moodle-user-id.png
---

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

With online teaching, I have to find ways to make many processes go faster, as otherwise teaching takes an inordinate amount of time compared to traditional teaching (and my salary doesn't change...).
[I have already written about automating exam production](/post/exam-template)
I've now taken to scanning my students' exams and grading them directly on my touchscreen computer.
This way I avoid all the issues that come with physical exams: I'm not scared to death of bringing them home anymore -- losing them means redoing the whole exam
😨, I have a backup, I can give more detailed feedback to students, give it to them earlier and more often, etc.

My department is equipped with one of these huge scanners that can easily chew through dozens of two-sided A3 exam booklets.
However, this produces a single huge PDF that contains all the exams.
This is easier to grade (I don't need to switch back and forth between 30+ booklets) but I need to ensure that every student gets their own exam, not everyone's exam, obviously.

I have thus written a PowerShell script to separate exams and name them automatically so that I can feed them to Moodle.
It's rather simple to use and self-explanatory.
[It is available as a GitHub gist.](https://gist.github.com/nidrissi/a802dc0a20ecad0bc8c077ce32b6ad92)
Note that you need [PDFtk](https://www.pdflabs.com/tools/pdftk-server/) to be installed.

The gist includes an example CSV file.
In the example, the exam of student Doe (Moodle participant ID 12345) is from page 1 to 4, and so on.
This produces a zip file that you can simply send to Moodle, and it will automatically pair students and exams.

<div class="bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-100 p-2 leading-none rounded-md">
  <FontAwesomeIcon icon={faExclamationTriangle} title="Warning" />
  &nbsp;
  The Moodle participant ID is <em>not</em> the student's user ID (that you can see on e.g. <a href={props.localImages[0].childImageSharp.original.src}>this image</a>).
  The participant ID is specific to the course and is more difficult to find.
  One possibility to find it is to <a href="https://docs.moodle.org/310/en/Assignment_settings#Feedback_types">enable offline grading worksheets</a> for the assignment, then to go on the assignment's page and select the bulk action "Download grading worksheet".
  You will obtain a CSV file whose first column will be the participant IDs, of the form <code>Participant12345678</code>.
  Copy the number (without <code>Participant</code>) in the CSV file that you give to my script.
</div>
