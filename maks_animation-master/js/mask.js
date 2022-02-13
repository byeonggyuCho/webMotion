class Show {
    //생성자함수 정의
    constructor(opt) {
        this.option = this.setOpt(opt);
        this.initDOM();
        this.init();
        this.bindingEvent();
    }

    //돔 초기화메서드
    initDOM() {
        this._wrap = document.querySelector(this.option.wrap);
        this._btns = this._wrap.querySelectorAll(this.option.btns);
        this._panel = this._wrap.querySelectorAll(this.option.panels);
        this.isBlock = false;
    }

    //옵션초기화메서드
    setOpt(option) {
        const basic = {
            wrap: "#wrap",
            btns: "#navi>li",
            panels: "#show>article",
            duration: 1000,
            class_name: { on: "on", hide: "hide", lower: "lower", upper: "upper" },
        };

        //const newObj = {...basic, ...option}
        //console.log(newObj);

        //return Object.assign({}, basic, option);
        return {...basic, ...option};
    }

    //이벤트연결메서드
    bindingEvent() {
        for (let i = 0; i < this._btns.length; i++) {
            this._btns[i].onclick = (e) => {
                let currentIndex = i;

                let isActive = e.target.classList.contains(
                    this.option.class_name.on
                );
                if (isActive) return;

                if (!this.isBlock) this.doActive(currentIndex);
            };
        }
    }

    init() {
        this.len = this._panel.length;
        for (let i = 0; i < this.len; i++) {
            this._panel[i].classList.remove(this.option.class_name.hide);
        }
    }

    //패널 활성화 메서드
    doActive(index) {
        console.log("clicked");

        this.isBlock = true;

        //먼저 반복을 돌며 초기화
        for (let i = 0; i < this._btns.length; i++) {
            //먼저 모든 버튼의 활성화 클래스를 지움
            this._btns[i].classList.remove(this.option.class_name.on);

            //upper클래스가 붙어있는 패널만 hide클래스를 추가해서 마스크모션 시작
            if (this._panel[i].classList.contains(this.option.class_name.upper)) {
                this._panel[i].classList.add(this.option.class_name.hide);
            }
        }

        //활성화 순번의 패널만 동영상 재생 시작
        this._panel[index].querySelector("video").load();
        this._panel[index].querySelector("video").play();

        //활성화 순번의 버튼만 활성화
        this._btns[index].classList.add(this.option.class_name.on);
        this._panel[index].classList.add(this.option.class_name.lower);

        //css animation시간인 1400만큼 딜레이 (마스크 모션 보여주기 위함)
        setTimeout(() => {
            //모든 패널을 반복 돌면서 
            for (let i = 0; i < this._panel.length; i++) {
                //만약 현재 반복도는 패널에 upper클래스가 있으면 
                if (
                    this._panel[i].classList.contains(this.option.class_name.upper)
                ) {
                    //해당 패널에 hide와 upper클래스를 지워서 사라지게 처리
                    this._panel[i].classList.remove(this.option.class_name.hide);
                    this._panel[i].classList.remove(this.option.class_name.upper);
                }
            }

            //그다음 활성화 패널의 lower클래스를 지우고 upper클래스를 붙여서 최상이 위쪽으로 배치
            this._panel[index].classList.remove(this.option.class_name.lower);
            this._panel[index].classList.add(this.option.class_name.upper);

            this.isBlock = false;
        }, this.option.duration);
    }
}
