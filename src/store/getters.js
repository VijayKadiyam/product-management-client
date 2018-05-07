const api         = state => state.config.api;
const bill_format = state => state.config.bill_format;
const company     = state => state.config.company;
const color       = state =>  state.config.color;
const nav         = state => state.app.nav;
const user        = state => state.auth.user;


export {
  api, bill_format, company, color, nav, user 
} 