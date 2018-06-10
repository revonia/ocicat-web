/**
 * Created by SiriusWangs on 2017/3/30.
 */
// 简单版本
export const EMAIL = /.+@.+/;
// RFC版本
export const EMAIL_RFC = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const USERNAME = /^[a-zA-Z][a-zA-Z0-9_.]{3,}$/u;
