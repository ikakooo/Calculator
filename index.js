/*-- These arrays store the calculator queue & current number --*/
var queue = new Array();
var current_number = new Array();
var tally = 0;
/*-- In some cases we need to disable digits / action keys --*/
let can_use_actions = false;
let can_use_digits = true;
/*-- Overwrite a common long JavaScript function to "gid" --*/
function gid(id) { return document.getElementById(id); }
function print_queue() {
  gid("message").innerHTML =  JSON.stringify(queue);
}
function print_current() {
  gid("message2").innerHTML = array_to_number(current_number); }
function array_to_number(number) {
  return number.toString().replace(/,/gi, ""); }
function reset_history() { gid("history").innerHTML = ""; }
function update_history() {
  gid("history").innerHTML = queue.toString().replace(/,/gi, ""); }
/*-- Scroll through all buttons on the calculator --*/
Object.entries(
  document.querySelectorAll("#buttons div")).map((element) => {
    element[1].addEventListener("click", function(event) {
    
    // get button value: 0-9,+,-,*,/,C or =
    let value = event.target.innerHTML;
    if (value == "." && current_number.indexOf(".") == -1)
      current_number.push(".");
/*-- Digit was pressed -- but don't process,
         it if digits cannot be used at this time *--/
    if (can_use_digits) {
      if (!isNaN(value) && value != "") {    
        current_number.push(value);      
        gid("view").innerHTML = array_to_number(current_number);
        print_queue();
        print_current();
        /*-- At least one digit was entered,
           we can use actions again --*/
        can_use_actions = true;
      }
    }
/*-- Process non-digit calculator keys, if enabled --*/
    switch (event.target.innerHTML)
    {
      case 'C':        /*-- Reset view --*/
        document.getElementById("view").innerHTML = "0";
        queue = new Array();
        current_number = new Array();
        can_use_actions = false;
        can_use_digits = true;
      break;
      case '=':        /*-- Reset view --*/
var complete = (queue.toString()+current_number).replace(/,/gi, "");
        queue = new Array();
        current_number = new Array();
        /*-- Assign result to current number in queue --*/
        var evaluated = eval(complete);
        gid("view").innerHTML = evaluated;
        current_number[0] = evaluated;
        reset_history();
        /*-- We just calculated result,
             This result becomes the first number in the queue
             Disable digits... and enable actions (+-/*) --*/
        can_use_actions = true;
        can_use_digits = false;
      break;
      case '*':
        if (can_use_actions) {
          queue.push(array_to_number(current_number));
          current_number = new Array();
          queue.push("*");
          can_use_actions = false;
          can_use_digits = true;
        }
      break;
      case '/':
       if (can_use_actions) {
          queue.push(array_to_number(current_number));
          current_number = new Array();
          queue.push("/");
          can_use_actions = false;
          can_use_digits = true;
        }
      break;
      case '+':
       if (can_use_actions) {
          queue.push(array_to_number(current_number));
          current_number = new Array();
          queue.push("+");
          can_use_actions = false;
          can_use_digits = true;
        }
      break;
      case '-':
        if (can_use_actions) {
          queue.push(array_to_number(current_number));
          current_number = new Array();
          queue.push("-");
          can_use_actions = false;
          can_use_digits = true;
        }
      break;
      default:
        update_history();
      break;  
    }
/*-- Display what's in queue array now just for reference --*/
   print_queue();
 });
});