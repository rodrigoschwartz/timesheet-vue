/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Home'
  },
  {
    path: '/projects',
    name: 'Projects',
    view: 'Projects'
  },
  {
    path: '/hours',
    name: 'Hours',
    view: 'Hours'
  },
  {
    path: '/value',
    name: 'Value',
    view: 'Value'
  },
  {
    path: '/auth',
    name: 'Auth',
    view: 'Auth'
  }
]
