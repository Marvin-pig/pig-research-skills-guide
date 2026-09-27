// Tutorial interactions are local; no research input is sent to a server.
const stageData = [
  {
    range: "选题与证据", status: "现在要做：确认问题与数据支持",
    title: "从值得回答的问题开始",
    description: "结合近期文献、包内字典和必要的汇总可行性检查，比较通常 3–5 个候选。已有明确题目时从现有进度进入。",
    inputs: ["研究方向或已选题目", "已有论文、方案或项目", "希望最终得到哪些成果"],
    outputs: ["有实质区别的候选与首选理由", "文献依据、已核实支持及待核查项", "下一步建议与自定义入口"],
    example: "“我想研究肾功能变化与重症预后，请比较可行选题，说明三库各自能承担什么角色。”"
  },
  {
    range: "详细方案", status: "现在要做：给出可以审阅的设计",
    title: "题目确定后，把设计讲完整",
    description: "明确问题、库的角色、观察单位、人群、time zero、变量定义、估计目标、缺失处理、模型诊断和每项图表计划。",
    inputs: ["选定或修改研究问题", "确认影响研究含义的重要取舍", "已有决定与研究约束"],
    outputs: ["详细研究设计与统计分析计划", "真实可行性与主要局限", "正文及补充图表安排"],
    example: "“我选择推荐题目，请给我完整方案，并解释关键定义和主要偏倚。”"
  },
  {
    range: "数据与执行约定", status: "现在要做：确定范围并落实取数",
    title: "把方案落到实际字段和时间线",
    description: "在已有授权范围内落实映射、连接、纳排和质量核查。参与频率与交付终点分别确定；常规实现由助手处理。",
    inputs: ["只到分析、图表或完整论文的终点", "连续执行、关键节点或分步推进", "尚未委托的重要科学选择"],
    outputs: ["可追溯取数和样本流程", "变量、缺失及时间关系检查", "执行范围与下一讨论节点"],
    example: "“方案已确认，请在样本核查和主结果两个节点讨论，最后完成全文。”"
  },
  {
    range: "分析与研究循环", status: "现在要做：估计、诊断与必要深化",
    title: "让发现决定下一步",
    description: "从真实数据计算，检查诊断与稳定性；必要时返回定义或方案。保留阴性、方向相反、跨库不一致和无法估计的结果。",
    inputs: ["约定节点上的判断", "改变主要定义时的决定", "对实际发现的解释或补充资料"],
    outputs: ["效应量、不确定性与分母", "模型诊断及有依据的敏感性分析", "仅针对失效部分的修订与更新"],
    example: "“如果原方案存在时间偏倚，请带证据提出修订；不要为了显著结果反复换模型。”"
  },
  {
    range: "图表、全文与交付", status: "现在要做：完成约定成果并核对",
    title: "图、数字与文字讲同一个结果",
    description: "图表从已计算结果生成；需要时调整绘图代码或 Word 表格。已委托完整论文时继续全文与审查，投稿材料与工作记录分别保存。",
    inputs: ["目标期刊或格式要求（如有）", "需要人工调整的图号", "真实作者、伦理和投稿相关信息"],
    outputs: ["约定范围的全文或分析成果", "定稿图表、适用的补充材料", "整洁投稿目录及单独的复现材料"],
    example: "“请将图 2 的图例移到下方。重新导出后请更新正文对应图，并检查所有数字和引用。”"
  }
];

const skillText = {
  criticalcare: "mimic-eicu-inspire-pig-skill",
  charls: "charls-pig", nhanes: "nhanes-pig", "nhanes-charls": "nhanes-charls-pig", "seven-aging": "seven-aging-pig-skill"
};
const packageSizes = {
  "mimic-eicu-inspire-pig-skill": [25.30,25.30],
  "charls-pig": [0.45,0.57], "nhanes-pig": [2.95,3.30], "nhanes-charls-pig": [3.16,3.60], "seven-aging-pig-skill": [6.25,7.84]
};
const situationText = { idea: "我目前只有一个研究想法", protocol: "我已经有一份研究方案", project: "我已经有一个进行中的项目", paper: "我已经有一份论文材料" };
const goalText = {
  topics: "请结合近期文献、包内字典和必要的汇总检查，给我通常 3–5 个有区别的可行选题，明确首选理由、数据支持和待核查事项；这一步先讨论选题",
  plan: "请先核对实际数据支持，形成完整研究设计和统计分析计划，包括人群、字段、时间、缺失处理、模型、诊断及逐项图表安排；先给我审阅方案",
  results: "请核对现有材料和数据可行性，先补齐需要审阅的方案。方案确认后执行到真实分析、图表和方法与结果分析包；本次不扩展为全文",
  manuscript: "请先核对数据与证据，给我详细研究设计和表图计划。方案确认后完成真实分析、必要诊断、图表、完整论文、引用核查和整洁投稿材料；不代我向期刊提交",
  review: "请审查已有材料与实际证据，指出优先需要解决的问题、推荐修改及后续选项；保留已确认的研究范围，不擅自改变统计结果"
};
const modeText = {
  continuous: "方案确认后采用连续执行，普通技术修复自主完成，重要科学变更先带证据讨论",
  checkpoints: "采用关键节点讨论，建议在样本与定义核查、主结果及诊断完成后讨论，节点之间连续推进",
  stepwise: "采用分步推进，完成当前约定阶段后展示产物、推荐行动与自定义入口，再由我决定下一阶段"
};

const toast = document.getElementById("toast");
let toastTimer;
function showToast(message = "已复制到剪贴板") {
  toast.textContent = message; toast.classList.add("is-visible");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}
async function copyText(text) {
  // Keep copying available for local HTML files and embedded browsers too.
  const previous = document.activeElement;
  const input = document.createElement("textarea");
  input.value = text; input.style.position = "fixed"; input.style.opacity = "0";
  document.body.appendChild(input); input.select();
  let copied = false;
  try { copied = document.execCommand("copy"); } catch { /* Try the async API below. */ }
  input.remove(); previous?.focus();
  if (copied) { showToast(); return; }
  let timer;
  try {
    await Promise.race([
      navigator.clipboard.writeText(text),
      new Promise((_, reject) => { timer=setTimeout(() => reject(new Error("Clipboard unavailable")),1500); })
    ]);
    showToast();
  } catch { showToast("未能自动复制，请选中文字后复制"); }
  finally { clearTimeout(timer); }
}
document.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", () => copyText(button.dataset.copy)));
document.querySelectorAll("[data-copy-from]").forEach(button => button.addEventListener("click", () => copyText(button.closest(".copy-block").querySelector("code").textContent.trim())));

const tabs = [...document.querySelectorAll(".journey-tab")];
function selectStage(index, focus = false) {
  const data = stageData[index];
  tabs.forEach((tab,i) => { tab.classList.toggle("is-active",i===index); tab.setAttribute("aria-selected",String(i===index)); tab.tabIndex=i===index ? 0 : -1; });
  document.getElementById("journey-panel").setAttribute("aria-labelledby",tabs[index].id);
  ["range","status","title","description"].forEach(key => document.getElementById("stage-"+key).textContent=data[key]);
  ["inputs","outputs"].forEach(key => document.getElementById("stage-"+key).replaceChildren(...data[key].map(text => {const li=document.createElement("li");li.textContent=text;return li;})));
  const label=document.createElement("span");label.textContent="这一段怎么配合";
  const example=document.createElement("p");example.textContent=data.example;
  document.getElementById("stage-example").replaceChildren(label,example);
  if (focus) tabs[index].focus();
}
tabs.forEach((tab,index) => {
  tab.addEventListener("click",() => selectStage(index));
  tab.addEventListener("keydown",event => {
    let next;
    if (["ArrowRight","ArrowDown"].includes(event.key)) next=(index+1)%tabs.length;
    else if (["ArrowLeft","ArrowUp"].includes(event.key)) next=(index-1+tabs.length)%tabs.length;
    else if (event.key==="Home") next=0;
    else if (event.key==="End") next=tabs.length-1;
    if (next!==undefined) { event.preventDefault();selectStage(next,true); }
  });
});
selectStage(0);

const selections={skill:"criticalcare",situation:"idea",goal:"topics",mode:"continuous"};
function updatePrompt() {
  const topic=document.getElementById("topic-input").value.trim() || "我的研究主题";
  const executes=["results","manuscript"].includes(selections.goal);
  document.getElementById("mode-field").hidden=!executes;
  let prompt=`$${skillText[selections.skill]}\n\n${situationText[selections.situation]}，主题是“${topic}”。${goalText[selections.goal]}。`;
  if (executes) prompt+=`\n\n${modeText[selections.mode]}。已有明确确认的方案和委托请沿用，不重复开启前序流程。`;
  document.getElementById("prompt-output").textContent=prompt;
}
document.getElementById("prompt-form").addEventListener("submit",event => event.preventDefault());
document.querySelectorAll(".choice-row").forEach(row => {
  row.querySelectorAll(".choice").forEach(button => button.setAttribute("aria-pressed",String(button.classList.contains("is-selected"))));
  row.addEventListener("click",event => {
    const button=event.target.closest(".choice");if (!button || !row.contains(button)) return;
    row.querySelectorAll(".choice").forEach(item => { item.classList.toggle("is-selected",item===button);item.setAttribute("aria-pressed",String(item===button)); });
    selections[row.dataset.choice]=button.dataset.value;updatePrompt();
  });
});
document.getElementById("topic-input").addEventListener("input",updatePrompt);
document.getElementById("copy-prompt").addEventListener("click",() => copyText(document.getElementById("prompt-output").textContent));
updatePrompt();

function updatePackage() {
  const name=document.getElementById("package-select").value;const [zip,expanded]=packageSizes[name];
  document.getElementById("package-windows").textContent=`${name}-Windows-x64.zip`;
  document.getElementById("package-mac").textContent=`${name}-macOS.zip`;
  document.getElementById("package-size").textContent=`每个 ZIP 约 ${zip.toFixed(2)} GiB，解压约 ${expanded.toFixed(2)} GiB。按电脑系统选择一份，两种包均含完整数据。`;
}
document.getElementById("package-select").addEventListener("change",updatePackage);
updatePackage();
document.querySelectorAll("details").forEach(details => {
  const sync=() => details.querySelector("summary")?.setAttribute("aria-expanded",String(details.open));
  details.addEventListener("toggle",sync);sync();
});
