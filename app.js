'use strict';

const galleries = {
  dls: { title: 'DLS Suite', images: [
    {src:'assets/dls-ponto.webp',alt:'Interface de leitura e revisão de cartões de ponto',caption:'DLS Ponto · Interface web para importação, ajuste e conferência de marcações.'},
    {src:'assets/dls-finance.webp',alt:'DLS Finance com ficha financeira fictícia e revisão de rubricas',caption:'DLS Finance · Extração e conferência demonstradas com documento fictício.'},
  ]},
  gestao: { title: 'SrRosa Gestão', images: [
    {src:'assets/srrosa-painel.webp',alt:'Painel do SrRosa Gestão em ambiente de demonstração',caption:'Visão do negócio · Interface real com dados fictícios e sem registros de clientes.'},
    {src:'assets/srrosa-precificacao.webp',alt:'Interface do módulo de precificação do SrRosa Gestão',caption:'Precificação · Custos, margem e preço sugerido organizados em um único fluxo.'},
  ]},
  marca: {title:'Identidade & catálogo · SrRosa Doces', images:[
    {src:'assets/srrosa-logo.webp',alt:'Logotipo horizontal da SrRosa Doces',caption:'Identidade visual · Logotipo e linguagem da marca.'},
    {src:'assets/srrosa-cardapio.webp',alt:'Cardápio digital da SrRosa Doces',caption:'Cardápio digital · Organização dos produtos em uma linguagem visual consistente. Fotografias ilustrativas.'},
    {src:'assets/srrosa-feed.webp',alt:'Conjunto de nove artes criadas para a SrRosa Doces',caption:'Aplicação da identidade nas peças de comunicação da marca.'},
  ]},
  social:{title:'Conteúdo para redes sociais',images:[
    {src:'assets/post-apresentacao.webp',alt:'Postagem de apresentação da SrRosa Doces',caption:'Apresentação da marca · Arte para feed. Fotografia ilustrativa.'},
    {src:'assets/post-essencia.webp',alt:'Postagem de posicionamento da SrRosa Doces',caption:'Essência da marca · Comunicação e identidade visual em conjunto.'},
    {src:'assets/post-brownies.webp',alt:'Arte para divulgação de brownies',caption:'Divulgação de produtos · Arte para feed com fotografia ilustrativa.'},
    {src:'assets/post-pedidos.webp',alt:'Postagem com etapas para encomendar',caption:'Conteúdo de orientação · Uma mensagem simples para facilitar o atendimento.'},
    {src:'assets/story-encomendas.webp',alt:'Story sobre encomendas',caption:'Story · A identidade da marca adaptada ao formato vertical. Fotografia ilustrativa.'},
    {src:'assets/srrosa-feed.webp',alt:'Prévia do feed com nove postagens',caption:'Conjunto do kit · 9 artes de feed, acompanhadas de stories, destaques, legendas e calendário editorial de 30 dias.'},
  ]},
};

const dialog=document.getElementById('gallery-dialog');
const title=document.getElementById('gallery-title');
const image=document.getElementById('gallery-image');
const caption=document.getElementById('gallery-caption');
const counter=document.getElementById('gallery-counter');
const previous=document.getElementById('gallery-prev');
const next=document.getElementById('gallery-next');
let activeGallery;
let activeIndex=0;
let trigger;

function renderImage(){
  const gallery=galleries[activeGallery];
  const item=gallery.images[activeIndex];
  title.textContent=gallery.title;
  image.src=item.src;
  image.alt=item.alt;
  caption.textContent=item.caption;
  counter.textContent=`DEMONSTRAÇÃO · ${activeIndex+1} DE ${gallery.images.length}`;
  previous.disabled=activeIndex===0;
  next.disabled=activeIndex===gallery.images.length-1;
}
document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{
  trigger=button;
  activeGallery=button.dataset.gallery;
  activeIndex=Number(button.dataset.index)||0;
  renderImage();
  dialog.showModal();
  document.body.classList.add('modal-open');
  document.getElementById('gallery-close').focus();
}));
function closeGallery(){dialog.close();}
document.getElementById('gallery-close').addEventListener('click',closeGallery);
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');trigger?.focus();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeGallery();}});
previous.addEventListener('click',()=>{if(activeIndex>0){activeIndex--;renderImage();}});
next.addEventListener('click',()=>{if(activeIndex<galleries[activeGallery].images.length-1){activeIndex++;renderImage();}});
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'&&!previous.disabled){activeIndex--;renderImage();}if(event.key==='ArrowRight'&&!next.disabled){activeIndex++;renderImage();}});
document.getElementById('year').textContent=String(new Date().getFullYear());
