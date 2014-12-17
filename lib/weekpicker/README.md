



<!DOCTYPE html>
<html lang="en" class="">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    
    
    <title>week-picker/README.md at master · morshedalam/week-picker · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png">
    <meta property="fb:app_id" content="1401488693436528">

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="morshedalam/week-picker" name="twitter:title" /><meta content="week-picker - A multi month week picker calendar" name="twitter:description" /><meta content="https://avatars3.githubusercontent.com/u/1405986?v=2&amp;s=400" name="twitter:image:src" />
<meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://avatars3.githubusercontent.com/u/1405986?v=2&amp;s=400" property="og:image" /><meta content="morshedalam/week-picker" property="og:title" /><meta content="https://github.com/morshedalam/week-picker" property="og:url" /><meta content="week-picker - A multi month week picker calendar" property="og:description" />

      <meta name="browser-stats-url" content="/_stats">
    <link rel="assets" href="https://assets-cdn.github.com/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035">
    

    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="selected-link" value="repo_source" data-pjax-transient>
      <meta name="google-analytics" content="UA-3769691-2">

    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="ADAE61DE:592C:29631C4:540FE2BA" name="octolytics-dimension-request_id" />
    <meta content="Rails, view, blob#show, " name="analytics-event" />

    
    
    <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">


    <meta content="authenticity_token" name="csrf-param" />
<meta content="NX4ZSnXTBBnE6txFaRPOMuUdQoPTB7cG20gG8BHkDopodYVndXC0fNpb/FB8ffDJ+AdBDADqrnZKLslr6rhIPg==" name="csrf-token" />

    <link href="https://assets-cdn.github.com/assets/github-250d7e217597cd75be73e4ea1c76a57d228d3d40.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://assets-cdn.github.com/assets/github2-30a95172d2f2a196ba5394de321fdee467b821e3.css" media="all" rel="stylesheet" type="text/css" />
    


    <meta http-equiv="x-pjax-version" content="6539c93ca6c8591ebce2cf2795c3c1c3">

      
  <meta name="description" content="week-picker - A multi month week picker calendar">
  <meta name="go-import" content="github.com/morshedalam/week-picker git https://github.com/morshedalam/week-picker.git">

  <meta content="1405986" name="octolytics-dimension-user_id" /><meta content="morshedalam" name="octolytics-dimension-user_login" /><meta content="11717555" name="octolytics-dimension-repository_id" /><meta content="morshedalam/week-picker" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="11717555" name="octolytics-dimension-repository_network_root_id" /><meta content="morshedalam/week-picker" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/morshedalam/week-picker/commits/master.atom" rel="alternate" title="Recent Commits to week-picker:master" type="application/atom+xml">

  </head>


  <body class="logged_out  env-production windows vis-public page-blob">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>
    <div class="wrapper">
      
      
      
      


      
      <div class="header header-logged-out">
  <div class="container clearfix">

    <a class="header-logo-wordmark" href="https://github.com/" ga-data-click="(Logged out) Header, go to homepage, icon:logo-wordmark">
      <span class="mega-octicon octicon-logo-github"></span>
    </a>

    <div class="header-actions">
        <a class="button primary" href="/join" data-ga-click="(Logged out) Header, clicked Sign up, text:sign-up">Sign up</a>
      <a class="button signin" href="/login?return_to=%2Fmorshedalam%2Fweek-picker%2Fblob%2Fmaster%2FREADME.md" data-ga-click="(Logged out) Header, clicked Sign in, text:sign-in">Sign in</a>
    </div>

    <div class="site-search repo-scope js-site-search">
      <form accept-charset="UTF-8" action="/morshedalam/week-picker/search" class="js-site-search-form" data-global-search-url="/search" data-repo-search-url="/morshedalam/week-picker/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
  <input type="text"
    class="js-site-search-field is-clearable"
    data-hotkey="s"
    name="q"
    placeholder="Search"
    data-global-scope-placeholder="Search GitHub"
    data-repo-scope-placeholder="Search"
    tabindex="1"
    autocapitalize="off">
  <div class="scope-badge">This repository</div>
</form>
    </div>

      <ul class="header-nav left">
          <li class="header-nav-item">
            <a class="header-nav-link" href="/explore" data-ga-click="(Logged out) Header, go to explore, text:explore">Explore</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="/features" data-ga-click="(Logged out) Header, go to features, text:features">Features</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="https://enterprise.github.com/" data-ga-click="(Logged out) Header, go to enterprise, text:enterprise">Enterprise</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="/blog" data-ga-click="(Logged out) Header, go to blog, text:blog">Blog</a>
          </li>
      </ul>

  </div>
</div>



      <div id="start-of-content" class="accessibility-aid"></div>
          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    <div id="js-flash-container">
      
    </div>
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        
<ul class="pagehead-actions">


  <li>
      <a href="/login?return_to=%2Fmorshedalam%2Fweek-picker"
    class="minibutton with-count star-button tooltipped tooltipped-n"
    aria-label="You must be signed in to star a repository" rel="nofollow">
    <span class="octicon octicon-star"></span>
    Star
  </a>

    <a class="social-count js-social-count" href="/morshedalam/week-picker/stargazers">
      6
    </a>

  </li>

    <li>
      <a href="/login?return_to=%2Fmorshedalam%2Fweek-picker"
        class="minibutton with-count js-toggler-target fork-button tooltipped tooltipped-n"
        aria-label="You must be signed in to fork a repository" rel="nofollow">
        <span class="octicon octicon-repo-forked"></span>
        Fork
      </a>
      <a href="/morshedalam/week-picker/network" class="social-count">
        2
      </a>
    </li>
</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="mega-octicon octicon-repo"></span>
          <span class="author"><a href="/morshedalam" class="url fn" itemprop="url" rel="author"><span itemprop="title">morshedalam</span></a></span><!--
       --><span class="path-divider">/</span><!--
       --><strong><a href="/morshedalam/week-picker" class="js-current-repository js-repo-home-link">week-picker</a></strong>

          <span class="page-context-loader">
            <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">
      <div class="repository-with-sidebar repo-container new-discussion-timeline  ">
        <div class="repository-sidebar clearfix">
            
<div class="sunken-menu vertical-right repo-nav js-repo-nav js-repository-container-pjax js-octicon-loaders" data-issue-count-url="/morshedalam/week-picker/issues/counts">
  <div class="sunken-menu-contents">
    <ul class="sunken-menu-group">
      <li class="tooltipped tooltipped-w" aria-label="Code">
        <a href="/morshedalam/week-picker" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-hotkey="g c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /morshedalam/week-picker">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped tooltipped-w" aria-label="Issues">
          <a href="/morshedalam/week-picker/issues" aria-label="Issues" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g i" data-selected-links="repo_issues repo_labels repo_milestones /morshedalam/week-picker/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class="js-issue-replace-counter"></span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped tooltipped-w" aria-label="Pull Requests">
        <a href="/morshedalam/week-picker/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g p" data-selected-links="repo_pulls /morshedalam/week-picker/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class="js-pull-replace-counter"></span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>


    </ul>
    <div class="sunken-menu-separator"></div>
    <ul class="sunken-menu-group">

      <li class="tooltipped tooltipped-w" aria-label="Pulse">
        <a href="/morshedalam/week-picker/pulse/weekly" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="pulse /morshedalam/week-picker/pulse/weekly">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped tooltipped-w" aria-label="Graphs">
        <a href="/morshedalam/week-picker/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="repo_graphs repo_contributors /morshedalam/week-picker/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>
    </ul>


  </div>
</div>

              <div class="only-with-full-nav">
                
  
<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><span class="text-emphasized">HTTPS</span> clone URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/morshedalam/week-picker.git" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/morshedalam/week-picker.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  
<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><span class="text-emphasized">Subversion</span> checkout URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/morshedalam/week-picker" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/morshedalam/week-picker" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>


<p class="clone-options">You can clone with
      <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>
      or <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>.
  <a href="https://help.github.com/articles/which-remote-url-should-i-use" class="help tooltipped tooltipped-n" aria-label="Get help on which URL is right for you.">
    <span class="octicon octicon-question"></span>
  </a>
</p>


  <a href="http://windows.github.com" class="minibutton sidebar-button" title="Save morshedalam/week-picker to your computer and use it in GitHub Desktop." aria-label="Save morshedalam/week-picker to your computer and use it in GitHub Desktop.">
    <span class="octicon octicon-device-desktop"></span>
    Clone in Desktop
  </a>

                <a href="/morshedalam/week-picker/archive/master.zip"
                   class="minibutton sidebar-button"
                   aria-label="Download the contents of morshedalam/week-picker as a zip file"
                   title="Download the contents of morshedalam/week-picker as a zip file"
                   rel="nofollow">
                  <span class="octicon octicon-cloud-download"></span>
                  Download ZIP
                </a>
              </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          

<a href="/morshedalam/week-picker/blob/ca34a026ac0d834e3b2f82ff39906e8ad9f5fa60/README.md" class="hidden js-permalink-shortcut" data-hotkey="y">Permalink</a>

<!-- blob contrib key: blob_contributors:v21:0499c6f210c142332a83c7b0ff5f2745 -->

<div class="file-navigation">
  
<div class="select-menu js-menu-container js-select-menu left">
  <span class="minibutton select-menu-button js-menu-target css-truncate" data-hotkey="w"
    data-master-branch="master"
    data-ref="master"
    title="master"
    role="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button css-truncate-target">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/morshedalam/week-picker/blob/master/README.md"
                 data-name="master"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="master">master</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="button-group right">
    <a href="/morshedalam/week-picker/find/master"
          class="js-show-file-finder minibutton empty-icon tooltipped tooltipped-s"
          data-pjax
          data-hotkey="t"
          aria-label="Quickly jump between files">
      <span class="octicon octicon-list-unordered"></span>
    </a>
    <button class="js-zeroclipboard minibutton zeroclipboard-button"
          data-clipboard-text="README.md"
          aria-label="Copy to clipboard"
          data-copied-hint="Copied!">
      <span class="octicon octicon-clippy"></span>
    </button>
  </div>

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/morshedalam/week-picker" class="" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">week-picker</span></a></span></span><span class="separator"> / </span><strong class="final-path">README.md</strong>
  </div>
</div>


  <div class="commit commit-loader file-history-tease js-deferred-content" data-url="/morshedalam/week-picker/contributors/master/README.md">
    <div class="file-history-tease-header">
      Fetching contributors&hellip;
    </div>

    <div class="participation">
      <p class="loader-loading"><img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32-EAF2F5.gif" width="16" /></p>
      <p class="loader-error">Cannot retrieve contributors at this time</p>
    </div>
  </div>

<div class="file-box">
  <div class="file">
    <div class="meta clearfix">
      <div class="info file-name">
          <span>46 lines (32 sloc)</span>
          <span class="meta-divider"></span>
        <span>0.932 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
          <a href="/morshedalam/week-picker/raw/master/README.md" class="minibutton " id="raw-url">Raw</a>
            <a href="/morshedalam/week-picker/blame/master/README.md" class="minibutton js-update-url-with-hash">Blame</a>
          <a href="/morshedalam/week-picker/commits/master/README.md" class="minibutton " rel="nofollow">History</a>
        </div><!-- /.button-group -->

          <a class="octicon-button tooltipped tooltipped-nw"
             href="http://windows.github.com" aria-label="Open this file in GitHub for Windows">
              <span class="octicon octicon-device-desktop"></span>
          </a>

            <a class="octicon-button disabled tooltipped tooltipped-w" href="#"
               aria-label="You must be signed in to make or propose changes"><span class="octicon octicon-pencil"></span></a>

          <a class="octicon-button danger disabled tooltipped tooltipped-w" href="#"
             aria-label="You must be signed in to make or propose changes">
          <span class="octicon octicon-trashcan"></span>
        </a>
      </div><!-- /.actions -->
    </div>
      <div id="readme" class="blob instapaper_body">
    <article class="markdown-body entry-content" itemprop="mainContentOfPage"><h1>
<a name="user-content-week-picker" class="anchor" href="#week-picker" aria-hidden="true"><span class="octicon octicon-link"></span></a><a href="http://scripts.morshed-alam.com/week-picker/">week-picker</a>
</h1>

<p>A multi month week picker calendar.</p>

<p><a href="http://scripts.morshed-alam.com/week-picker/">Demo</a></p>

<h1>
<a name="user-content-example" class="anchor" href="#example" aria-hidden="true"><span class="octicon octicon-link"></span></a>Example</h1>

<p>With default options:</p>

<div class="highlight highlight-html"><pre><span class="nt">&lt;input</span> <span class="na">data-weekpicker=</span><span class="s">"weekpicker"</span><span class="nt">/&gt;</span>
</pre></div>

<p>Specifying number of months via data tag:</p>

<div class="highlight highlight-html"><pre><span class="nt">&lt;input</span> <span class="na">data-weekpicker=</span><span class="s">"weekpicker"</span> <span class="na">data-months=</span><span class="s">"5"</span><span class="nt">/&gt;</span>
</pre></div>

<p>Specifying start of week via data tag:</p>

<div class="highlight highlight-html"><pre><span class="nt">&lt;input</span> <span class="na">data-weekpicker=</span><span class="s">"weekpicker"</span> <span class="na">data-week_start=</span><span class="s">"1"</span><span class="nt">/&gt;</span>
</pre></div>

<p>Specifying target field using icon:</p>

<div class="highlight highlight-html"><pre><span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">"text"</span> <span class="na">readonly=</span><span class="s">""</span> <span class="na">id=</span><span class="s">"week_range"</span><span class="nt">/&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"add-on"</span> <span class="na">data-weekpicker=</span><span class="s">"weekpicker"</span> <span class="na">data-target=</span><span class="s">"#week_range"</span><span class="nt">&gt;</span>
    <span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"icon-th"</span><span class="nt">&gt;&lt;/i&gt;</span>
<span class="nt">&lt;/span&gt;</span>
</pre></div>

<h2>
<a name="user-content-data-options" class="anchor" href="#data-options" aria-hidden="true"><span class="octicon octicon-link"></span></a>Data Options</h2>

<ul class="task-list">
<li>Default week start: 0 [0 - Sunday to 6 - Saturday]</li>
<li>Default Number of Weeks: 6</li>
<li>Target field: self [Can parameterize using data-target="#field_id"]</li>
</ul><h2>
<a name="user-content-to-do" class="anchor" href="#to-do" aria-hidden="true"><span class="octicon octicon-link"></span></a>TO DO</h2>

<ul class="task-list">
<li>Date format support</li>
<li>Theme support</li>
<li>Language support</li>
<li>Inline calendar</li>
</ul></article>
  </div>

  </div>
</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <form accept-charset="UTF-8" class="js-jump-to-line-form">
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" autofocus>
    <button type="submit" class="button">Go</button>
  </form>
</div>

        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="http://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/" aria-label="Homepage">
      <span class="mega-octicon octicon-mark-github" title="GitHub"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2014 <span title="0.04003s from github-fe129-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-suggester-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="fullscreen-contents js-fullscreen-contents js-suggester-field" placeholder=""></textarea>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped tooltipped-w" aria-label="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped tooltipped-w"
      aria-label="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-x close js-ajax-error-dismiss" aria-label="Dismiss error"></a>
      Something went wrong with that request. Please try again.
    </div>


      <script crossorigin="anonymous" src="https://assets-cdn.github.com/assets/frameworks-0c1b00f7935ae85624f5fc5d40d52d60febf92b4.js" type="text/javascript"></script>
      <script async="async" crossorigin="anonymous" src="https://assets-cdn.github.com/assets/github-1ca12566b241b645d3e1d487df11bf37293061de.js" type="text/javascript"></script>
      
      
        <script async src="https://www.google-analytics.com/analytics.js"></script>
  </body>
</html>

