import reset from "styled-reset";
import { injectGlobal } from "./typed-components";

// type script 작용을 없앰
// tslint:disable-next-line
injectGlobal`
/* @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic'); */
/* @import url('https://fonts.googleapis.com/css?family=Nanum+Pen+Script'); */
@import url('https://fonts.googleapis.com/css?family=Do+Hyeon');

${reset}
* {
    box-sizing: border-box;
}
body{
    font-family: 'Do Hyeon', -apple-system, system-ui, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;

    /* font-family: 'Nanum Pen Script', cursive; */

    /* font-family: -apple-system, system-ui, 'Nanum Gothic', BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; */
    /* font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; */
}
a{
    color:inherit;
    text-decoration:none;
}
input,
button{
    &:focus, &:active{outline:none}
}
`;
