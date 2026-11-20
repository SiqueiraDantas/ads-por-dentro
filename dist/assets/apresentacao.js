/* O painel didático é independente das interações da apresentação.
   Cada seção possui seu próprio DOM, folha de estilos e estado. */
(() => {
  'use strict';

  const technologies = ['html', 'css', 'js'];
  const names = { html: 'HTML', css: 'CSS', js: 'JavaScript' };
  const globalState = { html: true, css: true, js: true };
  const components = new Map();
  const toast = document.querySelector('#toast');
  let toastTimer;
  let clickCount = 0;
  let heroCreated = false;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function announce(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 4200);
  }

  function effective(component, technology) {
    return globalState[technology] && component.state[technology];
  }

  function navigateTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: motionQuery.matches ? 'instant' : 'smooth' });
    history.replaceState(null, '', `#${id}`);
    document.querySelector('.sidebar').removeAttribute('data-open');
    document.querySelector('.mobile-menu').setAttribute('aria-expanded', 'false');
    document.querySelector('.mobile-menu').setAttribute('aria-label', 'Abrir navegação e controles');
  }

  function updateComponent(component) {
    const htmlOn = effective(component, 'html');
    const cssOn = effective(component, 'css');
    const jsOn = effective(component, 'js');

    // Remoção real: os nós são guardados fora do documento e depois recolocados.
    if (!htmlOn && component.content.parentNode === component.root) {
      component.fragment.append(component.content);
    } else if (htmlOn && component.content.parentNode !== component.root) {
      component.root.append(component.fragment);
    }

    // Desativa a folha de estilos desta seção, sem regras de "aparência sem CSS".
    component.style.disabled = !cssOn;
    component.host.toggleAttribute('data-css-off', !cssOn);
    component.host.toggleAttribute('data-js-off', !jsOn);
    component.host.hidden = !htmlOn;
    component.placeholder.hidden = htmlOn;
    component.placeholder.querySelector('button').textContent = globalState.html
      ? 'Restaurar HTML desta seção' : 'Reativar HTML global';

    component.buttons.forEach((button, technology) => {
      button.setAttribute('aria-checked', String(effective(component, technology)));
      button.disabled = !globalState[technology];
      button.title = !globalState[technology]
        ? `${names[technology]} desligado globalmente. Reative-o na sidebar.`
        : `${component.state[technology] ? 'Retirar' : 'Restaurar'} ${names[technology]} desta seção`;
    });

    // Suspende as ações programadas. Links e <details> continuam nativos do HTML.
    component.content.querySelectorAll('[data-demo]').forEach(button => {
      if (jsOn) button.removeAttribute('aria-disabled');
      else button.setAttribute('aria-disabled', 'true');
    });

    const changes = [];
    if (!cssOn && htmlOn) changes.push('CSS retirado: você está vendo os estilos padrão do navegador.');
    if (!jsOn && htmlOn) changes.push('JavaScript desligado: as ações programadas estão pausadas. Links e controles nativos de HTML continuam funcionando.');
    component.note.textContent = changes.join(' ');
    component.note.hidden = changes.length === 0;
  }

  function updateAll() {
    components.forEach(updateComponent);
    technologies.forEach(technology => {
      const button = document.querySelector(`[data-global="${technology}"]`);
      button.setAttribute('aria-checked', String(globalState[technology]));
      button.title = `${globalState[technology] ? 'Retirar' : 'Restaurar'} ${names[technology]} em toda a apresentação`;
    });
    const globalActive = technologies.filter(technology => globalState[technology]).length;
    const hasLocalChanges = [...components.values()].some(component => technologies.some(technology => !component.state[technology]));
    const summary = document.querySelector('#active-summary');
    summary.textContent = hasLocalChanges ? 'Experimento em andamento' : `${globalActive} ${globalActive === 1 ? 'tecnologia ativa' : 'tecnologias ativas'}`;
    const disabled = technologies.filter(technology => !globalState[technology]);
    const banner = document.querySelector('#experiment-banner');
    banner.hidden = disabled.length === 0;
    document.querySelector('#experiment-description').textContent = disabled.map(technology => ({ html: 'HTML: conteúdo retirado.', css: 'CSS: estilos desativados.', js: 'JS: interações programadas pausadas.' })[technology]).join(' ');
    const allOff = disabled.length === technologies.length;
    document.querySelector('#remove-all span').textContent = allOff ? 'Ativar tudo' : 'Retirar tudo';
    document.querySelector('#remove-all').setAttribute('aria-label', allOff ? 'Ativar todas as tecnologias da apresentação' : 'Retirar todas as tecnologias da apresentação');
  }

  function restoreAll() {
    technologies.forEach(technology => { globalState[technology] = true; });
    components.forEach(component => { technologies.forEach(technology => { component.state[technology] = true; }); });
    updateAll();
    announce('Tudo restaurado. Pode experimentar de novo.');
  }

  function selectPath(component, key, focus = false) {
    component.content.querySelectorAll('[data-path]').forEach(button => {
      const selected = button.dataset.path === key;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected && focus) button.focus();
    });
    component.content.querySelectorAll('[role="tabpanel"]').forEach(panel => {
      panel.hidden = panel.id !== `panel-${key}`;
    });
  }

  function handleDemo(component, button) {
    if (!effective(component, 'js')) {
      announce('JavaScript está desligado nesta seção. Reative-o nos controles para testar.');
      return;
    }
    const content = component.content;
    switch (button.dataset.demo) {
      case 'hero': {
        heroCreated = !heroCreated;
        content.querySelector('#hero-message').textContent = heroCreated ? 'Sua ideia ganhou vida!' : 'Uma ideia pode mudar tudo.';
        content.querySelector('#hero-button-label').textContent = heroCreated ? 'Criar outra ideia' : 'Dê vida à ideia';
        content.querySelector('.layer-exhibit').toggleAttribute('data-celebrate', heroCreated);
        break;
      }
      case 'counter': {
        clickCount += 1;
        content.querySelector('#click-count').textContent = String(clickCount);
        content.querySelector('#counter-caption').textContent = `${clickCount} ${clickCount === 1 ? 'clique. Você acabou de executar JavaScript.' : 'cliques. O JavaScript atualizou este número.'}`;
        break;
      }
      case 'path': selectPath(component, button.dataset.path); break;
      case 'contrast': {
        const pressed = button.getAttribute('aria-pressed') !== 'true';
        button.setAttribute('aria-pressed', String(pressed));
        button.textContent = pressed ? 'Voltar ao contraste inicial' : 'Aumentar contraste';
        content.querySelector('#contrast-example').classList.toggle('high-contrast', pressed);
        content.querySelector('#contrast-note').textContent = pressed ? 'Mais contraste entre fundo e texto facilita a leitura.' : 'Teste também o teclado: pressione Tab para navegar.';
        break;
      }
      case 'answer': {
        const correct = button.dataset.answer === 'css';
        content.querySelectorAll('[data-answer]').forEach(option => {
          option.setAttribute('aria-pressed', String(option === button));
          option.removeAttribute('data-correct');
        });
        if (correct) button.setAttribute('data-correct', '');
        const feedback = content.querySelector('#quiz-feedback');
        feedback.dataset.result = correct ? 'correct' : 'incorrect';
        feedback.textContent = correct
          ? 'Isso! O CSS cuida da aparência. O HTML mantém o conteúdo e o JS mantém o botão funcionando.'
          : button.dataset.answer === 'html'
            ? 'Quase! Sem HTML, o conteúdo sairia da página. Qual tecnologia define cores, fontes e espaçamentos?'
            : 'Quase! Sem JavaScript, o contador pararia. Qual tecnologia transforma a aparência?';
        content.querySelector('[data-demo="quiz-reset"]').hidden = false;
        break;
      }
      case 'quiz-reset': {
        content.querySelectorAll('[data-answer]').forEach(option => { option.setAttribute('aria-pressed', 'false'); option.removeAttribute('data-correct'); });
        const feedback = content.querySelector('#quiz-feedback');
        feedback.textContent = 'Escolha uma tecnologia para responder.';
        delete feedback.dataset.result;
        button.hidden = true;
        content.querySelector('[data-answer]').focus();
        break;
      }
    }
  }

  document.querySelectorAll('ads-panel').forEach(host => {
    // Fallback para navegadores sem Declarative Shadow DOM.
    if (!host.shadowRoot) {
      const template = host.querySelector('template');
      if (!template) return;
      host.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
      template.remove();
    }
    const section = host.closest('[data-section]');
    const component = {
      host, section, root: host.shadowRoot,
      content: host.shadowRoot.querySelector('[data-content]'),
      style: host.shadowRoot.querySelector('[data-course-css]'),
      state: { html: true, css: true, js: true },
      fragment: document.createDocumentFragment(),
      buttons: new Map(),
      placeholder: section.querySelector('.html-placeholder'),
      note: section.querySelector('.component-state'),
    };
    components.set(host.dataset.component, component);
    technologies.forEach(technology => {
      const button = document.createElement('button');
      button.className = 'local-toggle';
      button.type = 'button';
      button.textContent = technology.toUpperCase();
      button.setAttribute('role', 'switch');
      button.setAttribute('aria-checked', 'true');
      button.setAttribute('aria-label', `${names[technology]} na seção ${section.querySelector('.component-toolbar>span').textContent.trim()}`);
      button.dataset.local = technology;
      button.addEventListener('click', () => {
        component.state[technology] = !component.state[technology];
        updateAll();
        announce(`${names[technology]} ${component.state[technology] ? 'restaurado' : 'retirado'} nesta seção.`);
      });
      section.querySelector('.component-toggles').append(button);
      component.buttons.set(technology, button);
    });
    component.root.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      const navigation = target.closest('[data-navigate]');
      if (navigation) { event.preventDefault(); navigateTo(navigation.dataset.navigate); return; }
      const button = target.closest('[data-demo]');
      if (button) handleDemo(component, button);
    });
    component.root.addEventListener('keydown', event => {
      const tab = event.target.closest('[role="tab"]');
      if (!tab || !effective(component, 'js')) return;
      const tabs = [...component.content.querySelectorAll('[role="tab"]')];
      const index = tabs.indexOf(tab);
      let next;
      if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectPath(component, tabs[next].dataset.path, true); }
    });
  });

  document.querySelectorAll('[data-global]').forEach(button => {
    button.addEventListener('click', () => {
      const technology = button.dataset.global;
      globalState[technology] = !globalState[technology];
      updateAll();
      announce(`${names[technology]} ${globalState[technology] ? 'reativado' : 'retirado'} em toda a apresentação.`);
    });
  });
  document.querySelector('#remove-all').addEventListener('click', () => {
    const allOff = technologies.every(technology => !globalState[technology]);
    if (allOff) { restoreAll(); return; }
    technologies.forEach(technology => { globalState[technology] = false; });
    updateAll();
    announce('As três tecnologias foram retiradas. Use Restaurar site para voltar.');
  });
  document.querySelector('#restore-all').addEventListener('click', restoreAll);
  document.querySelectorAll('[data-restore]').forEach(button => button.addEventListener('click', restoreAll));
  document.querySelectorAll('[data-restore-component]').forEach(button => {
    button.addEventListener('click', () => {
      const component = components.get(button.dataset.restoreComponent);
      globalState.html = true;
      component.state.html = true;
      updateAll();
      announce('HTML restaurado. O conteúdo voltou para a página.');
    });
  });
  document.querySelectorAll('.nav-link,.brand,.footer-wordmark').forEach(link => {
    link.addEventListener('click', event => { event.preventDefault(); navigateTo(link.hash.slice(1)); });
  });
  const menuButton = document.querySelector('.mobile-menu');
  menuButton.addEventListener('click', () => {
    const open = !document.querySelector('.sidebar').hasAttribute('data-open');
    document.querySelector('.sidebar').toggleAttribute('data-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar navegação e controles' : 'Abrir navegação e controles');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.querySelector('.sidebar').hasAttribute('data-open')) {
      document.querySelector('.sidebar').removeAttribute('data-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir navegação e controles');
      menuButton.focus();
    }
  });
  document.querySelector('#fullscreen').addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else announce('Neste navegador, use a opção de tela cheia do menu.');
    } catch { announce('Use a opção de tela cheia do navegador para apresentar.'); }
  });
  document.addEventListener('fullscreenchange', () => {
    document.querySelector('#fullscreen').setAttribute('aria-label', document.fullscreenElement ? 'Sair da tela cheia' : 'Entrar em tela cheia');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      const activeId = visible[0].target.id;
      document.querySelectorAll('.nav-link').forEach(link => {
        const active = link.hash === `#${activeId}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-12% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('[data-section]').forEach(section => observer.observe(section));
  }

  updateAll();
})();
