var m=Object.defineProperty;var p=(a,e,t)=>e in a?m(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var r=(a,e,t)=>(p(a,typeof e!="symbol"?e+"":e,t),t);import{a as l}from"./index-5d31ee83.js";import"./phaser-f8c8a439.js";import"./supabase-2481e69c.js";class w{constructor(){r(this,"element");r(this,"onAuthCallback");r(this,"currentStep","welcome");r(this,"currentEmail","");this.element=this.createElement(),this.setupEventListeners(),document.body.appendChild(this.element)}createElement(){const e=document.createElement("div");return e.id="auth-modal",e.className="auth-modal hidden",e.innerHTML=this.getModalHTML(),e}getModalHTML(){return`
      <div class="auth-modal-backdrop">
        <div class="auth-modal-content">
          <!-- Welcome Step -->
          <div class="auth-step" id="auth-step-welcome">
            <h2>🎮 Welcome to Etimuè Bottle Dropper!</h2>
            <p>Sign in to play and compete for prizes</p>

            <div class="auth-buttons">
              <button id="auth-google" class="auth-button auth-button-google">
                <span>🔍</span> Continue with Google
              </button>

              <button id="auth-email" class="auth-button auth-button-email">
                <span>📧</span> Continue with Email
              </button>
            </div>

            <button id="auth-close" class="auth-close-btn">×</button>
          </div>

          <!-- Email Step -->
          <div class="auth-step hidden" id="auth-step-email">
            <h2>📧 Sign in with Email</h2>
            <p>We'll send you a verification code</p>

            <div class="auth-form">
              <input
                type="email"
                id="auth-email-input"
                placeholder="your@email.com"
                class="auth-input"
              >
              <button id="auth-send-otp" class="auth-button auth-button-primary">
                Send Code
              </button>
              <button id="auth-back-welcome" class="auth-button auth-button-secondary">
                ← Back
              </button>
            </div>
          </div>

          <!-- Verify Step -->
          <div class="auth-step hidden" id="auth-step-verify">
            <h2>🔐 Enter Verification Code</h2>
            <p>Check your email for the 6-digit code</p>

            <div class="auth-form">
              <input
                type="text"
                id="auth-otp-input"
                placeholder="000000"
                class="auth-input auth-input-otp"
                maxlength="6"
              >
              <button id="auth-verify-otp" class="auth-button auth-button-primary">
                Verify
              </button>
              <button id="auth-back-email" class="auth-button auth-button-secondary">
                ← Back
              </button>
            </div>
          </div>

          <!-- Profile Setup Step -->
          <div class="auth-step hidden" id="auth-step-profile">
            <h2>👤 Setup Your Profile</h2>
            <p>Choose a nickname for the leaderboard</p>

            <div class="auth-form">
              <input
                type="text"
                id="auth-nickname-input"
                placeholder="Your nickname"
                class="auth-input"
                maxlength="20"
              >

              <div class="consent-checkbox">
                <label>
                  <input type="checkbox" id="marketing-consent" class="auth-checkbox">
                  I want to receive updates and compete for prizes
                </label>
              </div>

              <button id="auth-complete" class="auth-button auth-button-primary">
                Start Playing!
              </button>
            </div>
          </div>

          <!-- Loading overlay -->
          <div class="auth-loading hidden" id="auth-loading">
            <div class="spinner"></div>
            <p>Processing...</p>
          </div>
        </div>
      </div>
    `}setupEventListeners(){var e,t,i,o,s,h,c,u,d;(e=this.element.querySelector("#auth-close"))==null||e.addEventListener("click",()=>{this.hide()}),(t=this.element.querySelector("#auth-google"))==null||t.addEventListener("click",async()=>{await this.handleGoogleSignIn()}),(i=this.element.querySelector("#auth-email"))==null||i.addEventListener("click",()=>{this.showStep("email")}),(o=this.element.querySelector("#auth-send-otp"))==null||o.addEventListener("click",async()=>{await this.handleSendOTP()}),(s=this.element.querySelector("#auth-verify-otp"))==null||s.addEventListener("click",async()=>{await this.handleVerifyOTP()}),(h=this.element.querySelector("#auth-back-welcome"))==null||h.addEventListener("click",()=>{this.showStep("welcome")}),(c=this.element.querySelector("#auth-back-email"))==null||c.addEventListener("click",()=>{this.showStep("email")}),(u=this.element.querySelector("#auth-complete"))==null||u.addEventListener("click",async()=>{await this.handleCompleteProfile()}),(d=this.element.querySelector(".auth-modal-backdrop"))==null||d.addEventListener("click",n=>{n.target===n.currentTarget&&this.hide()}),this.element.addEventListener("keydown",n=>{n.key==="Escape"&&this.hide(),n.key==="Enter"&&this.handleEnterKey()})}async handleGoogleSignIn(){this.showLoading(!0);try{const e=await l.signInWithGoogle();e.success?console.log("Google sign in initiated"):(this.showError(e.error||"Google sign in failed"),this.showLoading(!1))}catch(e){console.error("Google sign in error:",e),this.showError("Unexpected error during Google sign in"),this.showLoading(!1)}}async handleSendOTP(){const e=this.element.querySelector("#auth-email-input"),t=e==null?void 0:e.value.trim();if(!t||!t.includes("@")){this.showError("Please enter a valid email address");return}this.currentEmail=t,this.showLoading(!0);try{const i=await l.signInWithOTP(t);i.success?(this.showStep("verify"),this.showSuccess("Verification code sent to your email!")):this.showError(i.error||"Failed to send verification code")}catch(i){console.error("Send OTP error:",i),this.showError("Unexpected error sending verification code")}finally{this.showLoading(!1)}}async handleVerifyOTP(){var i;const e=this.element.querySelector("#auth-otp-input"),t=e==null?void 0:e.value.trim();if(!t||t.length!==6){this.showError("Please enter the 6-digit verification code");return}this.showLoading(!0);try{const o=await l.verifyOTP(this.currentEmail,t);if(o.success){await new Promise(h=>setTimeout(h,1e3));const s=l.getState();s.isAuthenticated?(i=s.profile)!=null&&i.nickname?this.completeAuth(!0):this.showStep("profile"):this.showError("Authentication failed, please try again")}else this.showError(o.error||"Invalid verification code")}catch(o){console.error("Verify OTP error:",o),this.showError("Unexpected error during verification")}finally{this.showLoading(!1)}}async handleCompleteProfile(){const e=this.element.querySelector("#auth-nickname-input"),t=this.element.querySelector("#marketing-consent"),i=(e==null?void 0:e.value.trim())||null,o=(t==null?void 0:t.checked)||!1;this.showLoading(!0);try{await l.updateProfile({nickname:i,consent_marketing:o,consent_timestamp:o?new Date().toISOString():null}),this.completeAuth(!0)}catch(s){console.error("Profile update error:",s),this.showError("Failed to update profile"),this.showLoading(!1)}}showStep(e){this.element.querySelectorAll(".auth-step").forEach(i=>{i.classList.add("hidden")});const t=this.element.querySelector(`#auth-step-${e}`);if(t){t.classList.remove("hidden"),this.currentStep=e;const i=t.querySelector("input");i&&setTimeout(()=>i.focus(),100)}}showLoading(e){const t=this.element.querySelector("#auth-loading");t&&t.classList.toggle("hidden",!e)}showError(e){this.element.querySelectorAll(".auth-alert").forEach(o=>o.remove());const t=document.createElement("div");t.className="auth-alert auth-alert-error",t.textContent=e;const i=this.element.querySelector(".auth-step:not(.hidden)");i&&i.insertBefore(t,i.firstChild),setTimeout(()=>t.remove(),5e3)}showSuccess(e){this.element.querySelectorAll(".auth-alert").forEach(o=>o.remove());const t=document.createElement("div");t.className="auth-alert auth-alert-success",t.textContent=e;const i=this.element.querySelector(".auth-step:not(.hidden)");i&&i.insertBefore(t,i.firstChild),setTimeout(()=>t.remove(),3e3)}handleEnterKey(){var e,t,i;switch(this.currentStep){case"email":(e=this.element.querySelector("#auth-send-otp"))==null||e.dispatchEvent(new Event("click"));break;case"verify":(t=this.element.querySelector("#auth-verify-otp"))==null||t.dispatchEvent(new Event("click"));break;case"profile":(i=this.element.querySelector("#auth-complete"))==null||i.dispatchEvent(new Event("click"));break}}completeAuth(e){this.onAuthCallback&&this.onAuthCallback(e),this.hide()}show(){this.element.classList.remove("hidden"),this.showStep("welcome"),setTimeout(()=>{const e=this.element.querySelector(".auth-button");e==null||e.focus()},100)}hide(){this.element.classList.add("hidden"),this.completeAuth(!1)}onAuth(e){this.onAuthCallback=e}destroy(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}export{w as AuthModal};
//# sourceMappingURL=AuthModal-816ea8b3.js.map
