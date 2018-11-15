const BANNER_SUCCESS = 'home/BANNER_SUCCESS';
const ARTICLE_SUCCESS = 'home/ARTICLE_SUCCESS';
const ARTICLE = 'home/ARTICLE';
const INITALLOGO = 'home/INITALLOGO';
const CHANGEHISTORY = 'home/CHANGEHISTORY';

const initialState = {
  articleList: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BANNER_SUCCESS:
      return {
        ...state,
        bannerList: action.res.bannerList
      };
    case ARTICLE:
      return {
        ...state,
        articleLoading: true
      };
    case ARTICLE_SUCCESS:
      const {articleList = []} = state;
      return {
        ...state,
        articleList: [...articleList, ...action.res.Articles],
        articleLoading: false,
        dataEndLength: action.res.Articles.length
      };
    case CHANGEHISTORY:
      return {
        ...state,
        movelogo: true,
        text: action.text
      };
    default:
      return state;
  }
}

export function getBanner() {
  return {
    types: ['', BANNER_SUCCESS, ''],
    promise: axios.get('/bannerlist')
  };
}

export function getArticle(pageIndex) {
  return {
    types: [ARTICLE, ARTICLE_SUCCESS, ''],
    promise: axios.get(`/articleList/${pageIndex}`)
  };
}


export function changeRoute() {
  return {
    type: CHANGEHISTORY,
    text: 'showDocs'
  };
}
export function initalLogo() {
  return {
    type: INITALLOGO
  };
}
