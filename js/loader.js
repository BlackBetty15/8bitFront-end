/**
 * Created by milic on 24.9.2017..
 */
$('document').ready(
    getRoles(),
    dataUsers = getAll('get-all-users'),
    fillWithUsers(dataUsers),
    courses = getAll('get-courses'),
    fillWithCurses(courses),
    dataLessons = getAll('get-all-lessons'),
    fillWithLessons(dataLessons),
    getMyData()
);