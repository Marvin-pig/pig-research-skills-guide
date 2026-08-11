const stageData = [
  {
    range: "WF00",
    status: "现在要做：确认你的真实目标",
    title: "先把问题讲明白，不急着谈方法",
    description: "系统会判断你是需要选题、完善已有方案、直接执行、继续旧项目，还是处理论文工作。",
    inputs: ["大致想研究什么", "有没有现成方案或项目", "希望只做计划，还是最后得到结果"],
    outputs: ["本次任务的类型判断", "当前所在阶段", "下一步只做一件什么事"],
    example: "“我只有一个方向：孤独与认知变化。请先帮我看看能做哪些靠谱的题目。”"
  },
  {
    range: "WF01–WF02",
    status: "现在要做：确认数据支持并接受方案",
    title: "先查“有没有”，再决定“怎么做”",
    description: "系统只做汇总式检查：哪些数据库有相关信息、哪些年份可用、缺失是否太多、不同数据库能不能合理比较。",
    inputs: ["选择推荐题目或数据库组合", "确认研究对象、因素和结果", "对完整图表清单作出选择"],
    outputs: ["数据可行性与限制", "完整研究方案", "每张主图、附图和表格的计划"],
    example: "看到编号选项后，回复“1”接受推荐方案，或说“2，把年龄范围改为 60 岁以上”。"
  },
  {
    range: "WF03–WF06",
    status: "现在要做：把每个细节锁定",
    title: "把“差不多”变成“说得清”",
    description: "系统会核对问题原文、单位、分组、年份、缺失规则和人群范围，并把每个数据库的分析办法分别定好。",
    inputs: ["确认变量含义和分组方式", "确认人群筛选与起始时间", "确认分析方法、检查和备用方案"],
    outputs: ["准确的变量与数据说明", "最终分析人群规则", "正式锁定的分析和图表计划"],
    example: "这一步最适合选择“分步确认”，逐项看清系统为什么这样处理。"
  },
  {
    range: "WF07–WF09",
    status: "现在要做：真实分析与压力测试",
    title: "得到结果后，先检查它靠不靠谱",
    description: "系统按已确认的方案分别分析各数据库，再检查结果是否稳定、不同数据库是否一致，以及换一种合理做法会不会改变结论。",
    inputs: ["通常无需新增决定", "如遇关键数据问题，选择修正或缩小范围", "确认任何会改变原方案的重要调整"],
    outputs: ["每个数据库的正式结果", "结果质量与稳定性检查", "不一致、无明显差异和无法估计的情况"],
    example: "系统不会为了让结果更漂亮而删除不显著或方向相反的结果。"
  },
  {
    range: "WF10–WF12",
    status: "现在要做：做成品、逐项检查并交付",
    title: "让每个数字、图和段落都能追溯",
    description: "系统会生成全部计划图表、方法与结果文字，检查版式和数字，修正后再交付。完整论文是之后的单独选择。",
    inputs: ["确认目标期刊或输出要求", "查看重要偏差与修正记录", "分析包交付后选择是否继续完整论文"],
    outputs: ["可编辑的方法与结果文档", "完整图表及源数据、代码", "检查记录和最终交付目录"],
    example: "分析包通过后，你可以选择：生成完整论文、先改方法与结果、只保留分析包，或自定义。"
  }
];

const situationText = {
  idea: "我目前只有一个研究想法",
  protocol: "我已经有一份研究方案",
  project: "我已经有一个进行中的项目",
  paper: "我已经有一份论文材料"
};

const skillText = {
  charls: "charls-pig",
  nhanes: "nhanes-pig",
  "nhanes-charls": "nhanes-charls-pig",
  "seven-aging": "seven-aging-pig-skill"
};

const goalText = {
  topics: "请先核对本地字典和数据是否真的支持，再给我 3–5 个可行选题；不要直接开始分析",
  plan: "请先核对本地字典和数据，整理出一套完整、可执行的方案，并等我确认后再继续",
  results: "请先核对现有方案与本地数据；在我确认完整设计后，再按流程分析真实数据并交付方法与结果分析包",
  review: "请先审查现有材料，指出最早需要解决的问题，并给出一个明确的下一步；不要擅自扩大任务范围"
};

const toast = document.getElementById("toast");
let toastTimer;

function showToast(message = "已复制到剪贴板") {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast();
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    showToast();
  }
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copy));
});

document.querySelectorAll("[data-copy-from]").forEach((button) => {
  button.addEventListener("click", () => {
    const code = button.closest(".copy-block").querySelector("code");
    copyText(code.textContent.trim());
  });
});

document.querySelectorAll(".journey-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const index = Number(tab.dataset.stage);
    const data = stageData[index];
    document.querySelectorAll(".journey-tab").forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });
    document.getElementById("stage-range").textContent = data.range;
    document.getElementById("stage-status").textContent = data.status;
    document.getElementById("stage-title").textContent = data.title;
    document.getElementById("stage-description").textContent = data.description;
    document.getElementById("stage-inputs").innerHTML = data.inputs.map((item) => `<li>${item}</li>`).join("");
    document.getElementById("stage-outputs").innerHTML = data.outputs.map((item) => `<li>${item}</li>`).join("");
    document.getElementById("stage-example").innerHTML = `<span>这一段怎么配合</span><p>${data.example}</p>`;
  });
});

const selections = { skill: "charls", situation: "idea", goal: "topics" };

function updatePrompt() {
  const topic = document.getElementById("topic-input").value.trim() || "我的研究主题";
  const prompt = `/${skillText[selections.skill]}\n\n${situationText[selections.situation]}，主题是“${topic}”。${goalText[selections.goal]}。`;
  document.getElementById("prompt-output").textContent = prompt;
}

document.querySelectorAll(".choice-row").forEach((row) => {
  row.addEventListener("click", (event) => {
    const button = event.target.closest(".choice");
    if (!button) return;
    row.querySelectorAll(".choice").forEach((item) => item.classList.toggle("is-selected", item === button));
    selections[row.dataset.choice] = button.dataset.value;
    updatePrompt();
  });
});

document.getElementById("topic-input").addEventListener("input", updatePrompt);
document.getElementById("copy-prompt").addEventListener("click", () => copyText(document.getElementById("prompt-output").textContent));

document.querySelectorAll("details").forEach((details) => {
  details.addEventListener("toggle", () => {
    const summary = details.querySelector("summary");
    if (summary) summary.setAttribute("aria-expanded", details.open ? "true" : "false");
  });
});
