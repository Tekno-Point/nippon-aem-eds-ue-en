import { div } from '../../scripts/dom-helper.js';

function globalNetworkTabs(tabs, panelContainer) {
  const positions = [
    { top: '54%', left: '66.2%' },
    { top: '41%', left: '23.5%' },
    { top: '45%', left: '14.7%' },
    { top: '62%', left: '72.2%' },
    { top: '56%', left: '74.2%' },
    { top: '49%', left: '76.5%' },
    { top: '80%', left: '86.5%' },
    { top: '52%', left: '71.5%' },
  ];

  [...tabs.children].forEach((tab, i) => {
    const { top, left } = positions[i];

    const btn = div({
      class: 'gn-btns',
      style: `top: ${top}; left: ${left};`,
      onclick: () => tab.click(),
    });
    panelContainer.append(btn);
  });
}

/**
 *
 * @param {HTMLCollection} eleArr
 * @param {string} tabType
 */
function tabsOrchestrator(eleArr, tabType = 'default') {
  const orchObj = {
    'global-network': globalNetworkTabs,
  };

  const orchestrator = orchObj[tabType];
  if (orchestrator) orchestrator(...eleArr);
}

export default tabsOrchestrator;
