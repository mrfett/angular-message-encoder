import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  messageForm = new FormGroup({
    messageInput: new FormControl("Test Message."),
    seed: new FormControl("1234"),
    mode: new FormControl("encode")
  });
  title = "Angular Code Messages";
  messageInput = "Initial message.";
  messageOutput = "";

  characterString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // characterArray = [
  //   "a","b","c","d","e","f","g","h",i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z
  // ]

  setOutputValue = (val) => {
    this.messageOutput = val;
  };

  encode = () => {
    let inputString = this.messageForm.get("messageInput").value;
    let inputArray = inputString.split("");
    let seedString = this.messageForm.get("seed").value.toString();
    let seedArray = seedString.split("");
    let characterArray = this.characterString.split("");
    let output = [];
    console.log(inputArray);

    for (let i = 0; i < inputArray.length; i++) {
      let offset = parseInt(seedArray[i % seedArray.length], 10);
      if (this.messageForm.get("mode").value === "decode") {
        offset = offset * -1;
      }
      let characterIndex = characterArray.indexOf(inputArray[i]);
      if (characterIndex !== -1) {
        output[i] = characterArray[characterIndex + offset];
      } else {
        console.log(inputArray[i]);
        output[i] = inputArray[i];
      }
    }
    this.setOutputValue(output.join(""));
  };
}
