export default `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.scoutcard-header{display:flex;gap:16px;align-items:flex-start;font-family:Roboto,Arial,sans-serif;}
.scoutcard-header *{font-family:Roboto,Arial,sans-serif;}

.scoutcard-photo{width:150px;height:150px;flex:0 0 150px;border-radius:50%;overflow:hidden;background:#fff;}
.scoutcard-photo img{width:100%;height:100%;object-fit:contain;object-position:center;border-radius:50%;}

.scoutcard-main{flex:1;}

.scoutcard-name{display:flex;align-items:center;gap:6px;font-size:24px;font-weight:700;line-height:1.1;}
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