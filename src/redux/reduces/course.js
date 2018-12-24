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

// export function register(user, pass) {
//   return {
//     types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
//     promise: axios.post('/auth/register', {user, pass})
//   };
// }
//
// export function logout() {
//   return {
//     types: [LOGOUT, LOGOUT_SUCCESS],
//     promise: axios.post('/auth/logout')
//   };
// }
//
// export function emptyStatu() {
//   return {
//     type: EMPTYSTATU
//   };
// }
//
// export function getuser() {
//   return {
//     types: [GETUSER, GETUSER_SUCCESS],
//     promise: axios.get('/api/getuser')
//   };
// }
// export function test2() {
//   return {
//     type: TEST2,
//     text: '一些传值数据'
//   };
// }
