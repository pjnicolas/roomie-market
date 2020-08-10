import Vue from 'vue'
import moment from 'moment'

Vue.filter('toLocalDate', (value) => {
  if (value) {
    return moment.utc(value).local().format('DD/MM/YYYY HH:mm [h.]')
  } else {
    return 'Sin fecha'
  }
})
