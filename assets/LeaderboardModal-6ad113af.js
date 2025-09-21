var y=Object.defineProperty;var p=(o,e,a)=>e in o?y(o,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[e]=a;var n=(o,e,a)=>(p(o,typeof e!="symbol"?e+"":e,a),a);import{l as h,s as u,a as g}from"./index-f996db60.js";import"./supabase-2481e69c.js";import"./phaser-f8c8a439.js";class w{constructor(){n(this,"modal",null);n(this,"currentView","weekly");n(this,"isLoading",!1);this.createModal(),this.setupEventListeners()}createModal(){this.modal=document.createElement("div"),this.modal.id="leaderboard-modal",this.modal.className="leaderboard-modal",this.modal.style.display="none",this.modal.innerHTML=`
      <div class="leaderboard-modal-backdrop"></div>
      <div class="leaderboard-modal-content">
        <button class="leaderboard-close-btn" id="leaderboard-close">&times;</button>

        <div class="leaderboard-header">
          <h2 class="leaderboard-title" data-i18n="leaderboardTitle">🏆 Classifica</h2>
          <div class="leaderboard-tabs">
            <button class="leaderboard-tab active" data-tab="weekly" data-i18n="leaderboardWeekly">
              📅 Settimanale
            </button>
            <button class="leaderboard-tab" data-tab="monthly" data-i18n="leaderboardMonthly">
              📆 Mensile
            </button>
          </div>
        </div>

        <div class="leaderboard-content">
          <div class="leaderboard-loading" id="leaderboard-loading">
            <div class="spinner"></div>
            <p data-i18n="leaderboardLoading">Caricamento classifica...</p>
          </div>

          <div class="leaderboard-list" id="leaderboard-list">
            <!-- Dynamic content -->
          </div>

          <div class="leaderboard-empty" id="leaderboard-empty" style="display: none">
            <p data-i18n="leaderboardEmpty">Nessun punteggio ancora registrato!</p>
            <p class="leaderboard-encourage" data-i18n="leaderboardEncourage">
              Sii il primo a giocare e stabilire il record!
            </p>
          </div>
        </div>

        <div class="leaderboard-footer">
          <p class="leaderboard-info" data-i18n="leaderboardInfo">
            💡 Accedi per competere per i premi settimanali e mensili!
          </p>
        </div>
      </div>
    `,document.body.appendChild(this.modal)}setupEventListeners(){var t,s,r;const e=(t=this.modal)==null?void 0:t.querySelector("#leaderboard-close");e==null||e.addEventListener("click",()=>this.hide());const a=(s=this.modal)==null?void 0:s.querySelector(".leaderboard-modal-backdrop");a==null||a.addEventListener("click",()=>this.hide());const d=(r=this.modal)==null?void 0:r.querySelectorAll(".leaderboard-tab");d==null||d.forEach(l=>{l.addEventListener("click",i=>{const c=i.target.getAttribute("data-tab");this.switchTab(c)})}),h.onLanguageChange(()=>{this.updateTranslations()}),document.addEventListener("keydown",l=>{var i;l.key==="Escape"&&((i=this.modal)==null?void 0:i.style.display)!=="none"&&this.hide()})}updateTranslations(){if(!this.modal)return;const e=h.getTranslation();this.modal.querySelectorAll("[data-i18n]").forEach(a=>{const d=a.getAttribute("data-i18n");d&&d in e&&(a.textContent=e[d])})}switchTab(e){var d;if(this.currentView===e||this.isLoading)return;this.currentView=e;const a=(d=this.modal)==null?void 0:d.querySelectorAll(".leaderboard-tab");a==null||a.forEach(t=>{t.classList.remove("active"),t.getAttribute("data-tab")===e&&t.classList.add("active")}),this.loadLeaderboard()}async loadLeaderboard(){if(!(!this.modal||this.isLoading)){this.isLoading=!0,this.showLoading();try{console.log(`🏆 Loading ${this.currentView} leaderboard...`);let e=[];this.currentView==="weekly"?e=await this.getWeeklyLeaderboard():e=await this.getMonthlyLeaderboard(),this.renderLeaderboard(e)}catch(e){console.error("Error loading leaderboard:",e),this.showError()}finally{this.isLoading=!1,this.hideLoading()}}}async getWeeklyLeaderboard(){return(await u.getWeeklyLeaderboard(50)).map(a=>({id:a.id,score:a.score,run_seconds:a.run_seconds,created_at:a.created_at,nickname:a.nickname||"Anonimo",user_id:a.user_id}))}async getMonthlyLeaderboard(){return(await u.getMonthlyLeaderboard(50)).map(a=>({id:a.id,score:a.score,run_seconds:a.run_seconds,created_at:a.created_at,nickname:a.nickname||"Anonimo",user_id:a.user_id}))}renderLeaderboard(e){var s;if(!this.modal)return;const a=this.modal.querySelector("#leaderboard-list"),d=this.modal.querySelector("#leaderboard-empty");if(e.length===0){a.style.display="none",d.style.display="block";return}d.style.display="none",a.style.display="block";const t=(s=g.getState().user)==null?void 0:s.id;a.innerHTML=e.map((r,l)=>{const i=l+1,b=t===r.user_id,c=i<=3?this.getMedal(i):`${i}.`,m=new Date(r.created_at).toLocaleDateString(h.getCurrentLanguage()==="it"?"it-IT":"en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return`
        <div class="leaderboard-entry ${b?"current-user":""}">
          <div class="leaderboard-position">${c}</div>
          <div class="leaderboard-player">
            <div class="leaderboard-nickname">${r.nickname}</div>
            <div class="leaderboard-date">${m}</div>
          </div>
          <div class="leaderboard-score">
            <div class="score-value">${r.score}</div>
            <div class="score-time">${r.run_seconds}s</div>
          </div>
        </div>
      `}).join("")}getMedal(e){switch(e){case 1:return"🥇";case 2:return"🥈";case 3:return"🥉";default:return`${e}.`}}showLoading(){if(!this.modal)return;const e=this.modal.querySelector("#leaderboard-loading"),a=this.modal.querySelector("#leaderboard-list"),d=this.modal.querySelector("#leaderboard-empty");e.style.display="flex",a.style.display="none",d.style.display="none"}hideLoading(){if(!this.modal)return;const e=this.modal.querySelector("#leaderboard-loading");e.style.display="none"}showError(){if(!this.modal)return;const e=this.modal.querySelector("#leaderboard-list");e.innerHTML=`
      <div class="leaderboard-error">
        <p>❌ Errore nel caricamento della classifica</p>
        <button onclick="location.reload()" class="retry-btn">🔄 Riprova</button>
      </div>
    `,e.style.display="block"}show(){this.modal&&(this.modal.style.display="flex",this.updateTranslations(),this.loadLeaderboard(),console.log("🏆 Leaderboard modal opened"))}hide(){this.modal&&(this.modal.style.display="none",console.log("🏆 Leaderboard modal closed"))}destroy(){this.modal&&(this.modal.remove(),this.modal=null)}}export{w as LeaderboardModal};
//# sourceMappingURL=LeaderboardModal-6ad113af.js.map
