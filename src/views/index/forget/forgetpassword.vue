<template>
  <div>
    <top-column :top-header="topheader"></top-column>
    <forget></forget>
  </div>
</template>
<script>
import forget from '@/components/forgetPassword'
import {back} from "@utils";
export default {
  data () {
    return {
      submitLoading: false,
      topheader: {
        name: '',
        left: '1',
      },
    }
  },
  components: {
    forget
  },
  methods: {
 
    toback() {
      back('#ffffff')
      // window.location.href = `qtkjshop://background?color=#ffffff`
    },
  },
  computed: {
    disabled: function () {
      if (this.username && this.password && this.phone) {
        return true
      } else {
        return false
      }
    }

  },
  created () {

    this.toback()
  },

}
</script>
<style scoped lang="scss">
  .forgett{
    position: relative;
  }
  .login-all{
    width: 300px;
    margin-left: 37.5px;
    margin-top: 35px;
    position: relative;
  }
  
  .logo-bottom{
    margin-top: 55px;
    font-size: 22px;
    letter-spacing:1px;
    color: #333;
    text-align: left;
  }
  .login-choose{
    width: 255px;
    height: 36px;
    margin-top: 70px;
    background: white;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 22px;
    border: 1px solid #0088FD;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
  }
  .loginbtn{
    font-size: 16px;
    line-height: 34px;
    color: #999;
    z-index: 100;
  }
  .white{
    color: white;
  }
  .login-onoff{
    width: 127.5px;
    height: 35px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 21px;
    background: #0088FD;
    background: -webkit-linear-gradient(to right,#00A7FC, #0088FD);
    background: -moz-linear-gradient(to right,#00A7FC, #0088FD);
    background: linear-gradient(to right,#00A7FC, #0088FD);
    border:none;
    position: absolute;

  }
  .login-on{
    left: 0;
  }
  .login-off{
    left: 50%;
  }
  .login-warn{
    font-size: 12px;
    margin-top: 40px;
    color: #E9372F;
    letter-spacing:1px;
  }
  .login-warn-img{
    width: 16px;
    height: 16px;
    margin-right: 5px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  input{
    border: none;
    color: #333333;
  }
  input::-webkit-input-placeholder{
    color: #CCC;
  }
  .username,.password{
    font-size: 14px;
    line-height: 30px;
    padding-left: 11px;
  }
  .login-input{
    width: 100%;
    margin-top: 2px;
    margin-bottom:15px;
    border-bottom: 1px solid #f6f6f6;
    padding-bottom: 15px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .blue{
    border-bottom: 1px solid #0088FD;
  }
  .error-bottom{
    border-bottom: 1px solid red;
  }
  .login-pass{
    width: 100%;
    margin-top: 19px;
    border-bottom: 1px solid #0088FD;
    padding-bottom: 15px;
  }
  .login-input-img{
    width: 18px;
    height: 18px;
    svg{
      width: 100%;
      height: 100%;
    }
  }
  .login-eye{
    width: 18px;
    height: 18px;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
  .van-button{
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin-top: 15px;
    background: #0088FD;
    background: -webkit-linear-gradient(to right,#00A7FC, #0088FD);
    background: -moz-linear-gradient(to right,#00A7FC, #0088FD);
    background: linear-gradient(to right,#00A7FC, #0088FD);
    border:none
  }

  .login-forget{
    text-align: center;
    color: #ccc;
    font-size: 12px;
    margin-top: 15px;
  }
  .note{
    width: auto !important;
    margin-top: 0;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    padding: 0 5px;
    position: absolute;
    right: 5px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;

  }
  .noteclick{
    color: #999;
    background: none;
    border: none;
    right: 27.5px;
  }
.homelogo {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    img{
      width:100%;
    }
}
</style>
