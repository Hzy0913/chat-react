const HOTCOURSE = 'auth/HOTCOURSE';

const ALLCOURSE = 'auth/ALLCOURSE';

const LEARNEDALL = 'auth/LEARNEDALL';

const SUBJECT = 'auth/SUBJECT';

const initialState = {
  allCourse: [],
  hotCourse: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case HOTCOURSE:
      return {
        ...state,
        hotCourse: action.res.hotCourse
      };
    case ALLCOURSE:
      return {
        ...state,
        allCourse: action.res.course
      };
    case LEARNEDALL:
      return {
        ...state,
        allLearned: action.res.course
      };
    case SUBJECT:
      return {
        ...state,
        subjects: action.res.subjects
      };
    default:
      return state;
  }
}

export function getHotCourse() {
  return {
    types: ['', HOTCOURSE, ''],
    promise: axios.get('/hotcourse')
  };
}
export function getAllCourse() {
  return {
    types: ['', ALLCOURSE, ''],
    promise: axios.get('/allcourse')
  };
}
export function getAllLearned() {
  return {
    types: ['', LEARNEDALL, ''],
    promise: axios.get('/getmycourse')
  };
}
export function getAllSubject() {
  return {
    types: ['', SUBJECT, ''],
    promise: axios.get('/subject')
  };
}
