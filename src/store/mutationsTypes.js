const types = {
  // 设置用户信息
  SET_USER_INFO: 'SET_USER_INFO',
  // 设置网络请求数据
  SET_N_DATA: 'SET_N_DATA',
  // 设置显示错误信息
  TOGGLE_MSG: 'TOGGLE_MSG',
  // 设置错误信息
  SET_MSG: 'SET_MSG',
  // 这个没用到的
  SUBMISSION: {
    SET_SUBMISSION_DETAIL_QUERY_PARAM: 'SUBMISSION_SET_SUBMISSION_DETAIL_QUERY_PARAM',
  },
  // 编程问题模块
  PROBLEM: {
    SET_DESCRIPTION: 'PROBLEM_SET_DESCRIPTION',
    SET_CURRENT_SUBMISSION_RES_ID: 'PROBLEM_SET_CURRENT_SUBMISSION_RES_ID',
    SET_TEST_CASE: 'PROBLEM_SET_TEST_CASE',
    CLEAR_TEST_CASE: 'PROBLEM_CLEAR_TEST_CASE',
  },
}
export default types