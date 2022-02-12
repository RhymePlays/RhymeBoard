var DashboardData = {
    Widgets: {
        sxr54l: { type: "counter", WidgetID: "sxr54l", note: "Times i've jacked off this month", counter: 12 },
        SkrattadaFlurradu: { type: "note", WidgetID: "SkrattadaFlurradu", note: "I jack off a lot" },
    }
}

class CounterWidget {

    constructor(widgetData) {
        if (widgetData.type == "counter") {
            this.WidgetID = widgetData.WidgetID;
            this.note = widgetData.note;
            this.counter = widgetData.counter;
            this.createHTML();
        }
    }

    updateWidget() {
        document.getElementById(this.WidgetID).getElementsByClassName("CounterWidgetNote")[0].innerText = this.note;
        document.getElementById(this.WidgetID).getElementsByClassName("CounterWidgetCounterPart")[0].getElementsByClassName("CounterWidgetDisplay")[0].innerText = this.counter;
    }

    createHTML() {
        // Add Button
        let CounterWidgetAdd = document.createElement("div");
        CounterWidgetAdd.classList = ["RadialButton CounterWidgetAdd"];
        CounterWidgetAdd.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>'
        CounterWidgetAdd.setAttribute("onclick", "javascript:Widgets." + this.WidgetID + ".increment()");

        // Sub Button
        let CounterWidgetSub = document.createElement("div");
        CounterWidgetSub.classList = ["RadialButton CounterWidgetSub"];
        CounterWidgetSub.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>'
        CounterWidgetSub.setAttribute("onclick", "javascript:Widgets." + this.WidgetID + ".decrement()");

        // Controls
        let CounterWidgetActions = document.createElement("div");
        CounterWidgetActions.classList = ["CounterWidgetActions"];
        CounterWidgetActions.append(CounterWidgetAdd, CounterWidgetSub);

        // Display
        let CounterWidgetDisplay = document.createElement("div");
        CounterWidgetDisplay.classList = ["CounterWidgetDisplay"];
        CounterWidgetDisplay.innerText = this.counter;

        // Counter
        let CounterWidgetCounterPart = document.createElement("div");
        CounterWidgetCounterPart.classList = ["CounterWidgetCounterPart"];
        CounterWidgetCounterPart.append(CounterWidgetDisplay, CounterWidgetActions);

        // Note
        let CounterWidgetNote = document.createElement("div");
        CounterWidgetNote.classList = ["CounterWidgetNote NoteWidgetText"];
        CounterWidgetNote.innerText = this.note;
        CounterWidgetNote.contentEditable = "True";
        CounterWidgetNote.setAttribute("onfocusout", "javascript:Widgets." + this.WidgetID + ".saveNote()");

        // Root
        let WidgetElement = document.createElement("div");
        WidgetElement.classList = ["CounterWidgetBG"];
        WidgetElement.id = this.WidgetID;
        WidgetElement.append(CounterWidgetNote, CounterWidgetCounterPart);

        return WidgetElement;
    }

    increment() { this.counter = this.counter + 1; this.updateWidget(); this.saveCounter(); }
    decrement() { this.counter = this.counter - 1; this.updateWidget(); this.saveCounter(); }

    saveNote() {
        // HTML to Note
        this.note = document.getElementById(this.WidgetID).getElementsByClassName("CounterWidgetNote")[0].innerText;
        DashboardData.Widgets[this.WidgetID].note = this.note;
    }

    saveCounter() { DashboardData.Widgets[this.WidgetID].counter = this.counter; }

}

class NoteWidget {

    constructor(widgetData) {
        if (widgetData.type == "note") {
            this.WidgetID = widgetData.WidgetID;
            this.note = widgetData.note;
            this.counter = widgetData.counter;
            this.createHTML();
        }
    }

}

var Widgets = {}

function populateWidgets() {
    let WidgetContainer = document.getElementById("WidgetContainer")
    for (let WidgetIndex in DashboardData.Widgets) {
        let WidgetConstructorData = DashboardData.Widgets[WidgetIndex];

        if (WidgetConstructorData.type == "counter") { Widgets[WidgetConstructorData.WidgetID] = new CounterWidget(WidgetConstructorData); WidgetContainer.append(Widgets[WidgetConstructorData.WidgetID].createHTML()); }
        // else if (WidgetConstructorData.type == "note") { Widgets[WidgetConstructorData.WidgetID] = new NoteWidget(WidgetConstructorData); WidgetContainer.append(Widgets[WidgetConstructorData.WidgetID].createHTML()); }
    }
}
populateWidgets();