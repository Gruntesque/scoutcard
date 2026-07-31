export default `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&family=Sora:wght@300;400;500;600;700&display=swap');

.scoutcard-header{display:flex;gap:16px;align-items:flex-start;font-family:Sora,"Noto Sans","Segoe UI Symbol","Apple Symbols",sans-serif;}
.scoutcard-header *{font-family:Sora,"Noto Sans","Segoe UI Symbol","Apple Symbols",sans-serif;}

.scoutcard-photo{width:150px;height:150px;flex:0 0 150px;position:relative;overflow:visible;isolation:isolate;}
.scoutcard-photo-glow{position:absolute;inset:-16px;border-radius:50%;background:radial-gradient(circle,rgba(116,163,255,.28) 0%,rgba(67,104,190,.14) 42%,transparent 72%);filter:blur(10px);pointer-events:none;z-index:0;}
.scoutcard-photo-frame{position:absolute;inset:6px;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 32%,#24334d 0%,#101725 68%,#090d15 100%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);z-index:1;}
.scoutcard-photo-frame-colored{background:radial-gradient(circle at 50% 42%,var(--scoutcard-photo-background) 0%,var(--scoutcard-photo-background) 34%,#101725 76%,#090d15 100%);}
.scoutcard-photo-ring{position:absolute;inset:0;border:1px solid rgba(159,190,255,.46);border-radius:50%;box-shadow:0 0 0 2px rgba(107,148,233,.08),0 8px 20px rgba(0,0,0,.36),inset 0 0 0 1px rgba(255,255,255,.08);pointer-events:none;z-index:2;}
.scoutcard-photo-portrait{display:block;width:100%;height:100%;object-fit:contain;object-position:center;}
.scoutcard-photo-background-white,.scoutcard-photo-background-solid,.scoutcard-photo-background-field{-webkit-mask-image:linear-gradient(to right,transparent 4%,rgba(0,0,0,.18) 16%,black 34%,black 66%,rgba(0,0,0,.18) 84%,transparent 96%);mask-image:linear-gradient(to right,transparent 4%,rgba(0,0,0,.18) 16%,black 34%,black 66%,rgba(0,0,0,.18) 84%,transparent 96%);}

.scoutcard-main{flex:1;padding-top:8px;}

.scoutcard-name{display:flex;align-items:center;gap:6px;font-size:24px;font-weight:700;line-height:1.1;}
#scoutcard-tooltip .scoutcard-name,#scoutcard-tooltip .scoutcard-name *{font-family:Sora,"Noto Sans","Segoe UI Symbol","Apple Symbols",sans-serif !important;}
.scoutcard-sorare-link{color:#fff;text-decoration:none;}
.scoutcard-sorare-link:hover{color:#fff2a8;text-decoration:none;}

.scoutcard-flag{width:20px;height:15px;object-fit:cover;}
.scoutcard-captain{width:18px;height:18px;object-fit:contain;}

.scoutcard-club{margin-top:4px;font-size:18px;font-weight:600;}
.scoutcard-position{margin-top:4px;font-size:18px;font-weight:500;}

.scoutcard-details{display:flex;align-items:center;gap:6px;margin-top:4px;font-size:18px;}
.scoutcard-foot{width:22px;height:22px;object-fit:contain;}

.scoutcard-market{margin-top:4px;font-size:18px;}

.scoutcard-injury{display:flex;align-items:flex-start;gap:8px;margin-top:10px;padding:8px 10px;border-radius:8px;background:rgba(220,53,69,.15);border:1px solid rgba(220,53,69,.35);}
.scoutcard-injury-icon{flex:0 0 auto;font-size:18px;line-height:1;}
.scoutcard-injury-text{flex:1;}
.scoutcard-injury-title{font-size:15px;font-weight:700;}
.scoutcard-injury-return{margin-top:2px;font-size:13px;opacity:.85;}

.scoutcard-loan{display:flex;align-items:center;gap:8px;margin-top:10px;padding:8px 10px;border-radius:8px;background:rgba(13,110,253,.15);border:1px solid rgba(13,110,253,.35);}
.scoutcard-loan-icon{flex:0 0 auto;font-size:18px;line-height:1;}
.scoutcard-loan-title{font-size:15px;font-weight:700;}
`;
