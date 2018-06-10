import request from '../utils/request';
import { API_URL } from '../config/api';


export function fetchClassn(classn_id) {
  return request(API_URL + `/classns/${classn_id}`, {
    method: 'GET',
  });
}

export function fetchClassnCourses(classn_id) {
  return request(API_URL + `/classns/${classn_id}/courses`, {
    method: 'GET',
  });
}

export function fetchCourseClassns(course_id) {
  return request(API_URL + `/courses/${course_id}/classns`, {
    method: 'GET',
  });
}

export function fetchStudentStat(student_id) {
  return request(API_URL + `/students/${student_id}/stat`, {
    method: 'GET',
  });
}

export function fetchCourseFlat(course_id) {
  return request(API_URL + `/courses/${course_id}.flat`, {
    method: 'GET',
  });
}

export function fetchTeacherCourses(teacher_id) {
  return request(API_URL + `/teachers/${teacher_id}/courses`, {
    method: 'GET',
  });
}

export function fetchLessonStat(lesson_id) {
  return request(API_URL + `/lessons/${lesson_id}/stat`, {
    method: 'GET',
  });
}

export function addLesson(course_id) {
  return request(API_URL + `/courses/${course_id}/lessons`, {
    method: 'POST',
  });
}
