<template>
  <div
    v-show="toShow"
    v-bind:class="{
      'alert':		true,
      'alert-success':(type == 'success'),
      'alert-warning':(type == 'warning'),
      'alert-info':	(type == 'info'),
      'alert-danger':	(type == 'danger'),
      'top': 			(placement === 'top'),
      'mr-10 mt-10': 	(placement === 'top-right')
    }"
    transition="fade"
    v-bind:style="{width:width}"
    role="alert">
    <button v-show="dismiss" type="button" class="close"
      @click="dismiss = true">
      <span>&times;</span>
    </button>
    <slot></slot>
  </div>
</template>

<script>
import {coerce} from '../helpers/utils.js'
export default {
  name: 'alert',
  props: {
    type: {
      type: String
    },
    dismissable: {
      type: Boolean,
      coerce: coerce.boolean,
      default: true
    },
    show: {
      type: Boolean,
      coerce: coerce.boolean,
      default: true,
      twoWay: true
    },
    duration: {
      type: Number,
      coerce: coerce.number,
      default: 4
    },
    width: {
      type: String,
      default: '90px'
    },
    placement: {
      type: String,
      default: 'top-right'
    }
  },
  data:function(){
    return {
        dismiss: this.dismissable,
        showAlert: this.show
    }
  },
  computed: {
    toShow: function () {
        var result = this.show
      if (this._timeout) clearTimeout(this._timeout)
      if (Boolean(this.duration)) {
        this._timeout = setTimeout(() => { result = false }, this.duration)
      }
      return result
    },
  }
}
</script>

<style>
.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter,
.fade-leave {
  height: 0;
  opacity: 0;
}
.alert.top {
  position: fixed;
  top: 30px;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 1050;
}
.alert.top-right {
  position: fixed;
  top: 30px;
  right: 50px;
  z-index: 1050;
}
</style>