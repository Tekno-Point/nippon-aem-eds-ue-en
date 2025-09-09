import {
  div, input, span, label,
} from '../../scripts/dom-helper.js';

export const tabTypes = ['global-network', 'overview-tabs'];

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

function overviewTabs(tabs, panelContainer) {
  [...tabs.children].forEach((tab) => {
    const isSelected = tab.getAttribute('aria-selected') === 'true';
    const inpt = input({ type: 'radio', class: 'hidden', name: 'tab-radio', checked: isSelected });
    tab.addEventListener('click', () => { inpt.checked = true; });
    const radioIcon = span({ class: 'radio-icon' }, span({ class: 'radio-icon-dot' }));
    const labelEle = label({}, inpt, radioIcon);
    labelEle.append(tab.firstElementChild);
    tab.prepend(labelEle);
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
    'overview-tabs': overviewTabs,
  };

  const orchestrator = orchObj[tabType];
  if (orchestrator) orchestrator(...eleArr);
}

export default tabsOrchestrator;
