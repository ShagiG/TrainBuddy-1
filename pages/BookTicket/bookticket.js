function createTrainCard() {
  let html = "";
  html = `<div class="train-avail">
          <div class="ui-grid-a type-badge">
            <p class="type">Express</p>
          </div>
          <hr />
          <div class="ui-grid-b tick-info">
            <div class="ui-block-a">
              <p class="time-txt">10.40AM</p>
              <p class="place-txt">Colombo</p>
            </div>
            <div class="ui-block-b arrow">
              <img src="/assets/icons/arrow-right.svg" />
            </div>
            <div class="ui-block-c" style="text-align: right;">
              <p class="time-txt">02.40PM</p>
              <p class="place-txt">Kandy</p>
            </div>
          </div>
          <div class="ui-grid-a">
            <div class="ui-block-a">
              <p class="train-name">Udaratta manikke</p>
            </div>
            <div class="ui-block-b" style="text-align: right;">
              <p class="duration">04H 15MIN</p>
            </div>
          </div>
          <hr />
          <div class="ui-grid-a">
            <p class="price">LKR350</p>
          </div>
        </div>`;
}
