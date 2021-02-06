//Widget DeepL Translation
DevD.component("deepl-translation", {
  template:
    /*html*/
    `<div id="divDeeplTranslate" class="divRectangle">
        <h2>DeepL Translate</h2>
        <label for="sltLanguageSource">Source language</label>
        <select id="sltLanguageSource">
            <option value="fr">French</option>
            <option value="en">English</option>
            <option value="en">German</option>
        </select>
        <textarea class="widthmozavailable" cols="50" rows="6" placeholder="Write your text here:"></textarea><p></p>
        <h3 class="nomargin">Result:</h3>
        <label for="sltLanguageDestination">Destination language</label>
        <select id="sltLanguageDestination">
            <option value="fr">French</option>
            <option value="en">English</option>
            <option value="en">German</option>
        </select>
        <br>
        <div class="thinBlueBorder littlepadding">
        <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi dolore eius excepturi optio quo
            sint voluptates. Architecto asperiores cupiditate dolore dolores esse facilis ipsa odit quam quibusdam!
        </span>
        </div>
    </div>`,
});
