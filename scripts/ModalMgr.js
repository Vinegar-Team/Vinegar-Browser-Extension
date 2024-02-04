class ModalMgr {
	overlay = true;
	title = "";
	content = "";
	id = 0;

	constructor() {}

	async displayModalOk(template = "view/modal.html") {
		this.id++;

		let prom = await Tpl.loadFile(template);
		Tpl.setIf("overlay", this.overlay);
		Tpl.setVar("title", this.title);
		Tpl.setVar("id", this.id);
		Tpl.setVar("content", this.content);

		let content = Tpl.render(prom);
		$("body").append(content);

		$("#modal-" + this.id).hide();

		await $("#modal-" + this.id)
			.slideDown("slow")
			.promise();

		//Bind the click events
		document
			.querySelectorAll("#modal-" + this.id + " button.modal-ok")
			.forEach(
				function (value, key) {
					value.addEventListener(
						"click",
						async function (event) {
							this.close();
						}.bind(this)
					);
					window.addEventListener(
						"keydown",
						function (event) {
							if (
								["Escape", " ", "Enter"].indexOf(event.key) !=
								-1
							)
								this.close();
						}.bind(this)
					);
				}.bind(this)
			);
	}

	async close() {
		$("#overlay-" + this.id).animate({ opacity: "hide" }, 300);
		await $("#modal-" + this.id)
			.animate({ opacity: "hide" }, 300)
			.promise();

		//document.querySelector("#modal-" + this.id).remove();
		//document.querySelector("#overlay-" + this.id).remove();
	}
}
