<script>
	import { Router, Link, Route } from "svelte-routing";
	  import Dashboard from "./pages/dashboard.svelte";
	  import Pages from "./pages/pages.svelte";
	  import Blog from "./pages/blog.svelte";
	 
	
	  export let url = "";
</script>
<style>
	.body{font-size:14px;}
</style>
<Router url="{url}">
	<header class="py-3 bg-white">
		<div class="container">
			<div class="header">
				<nav class="navbar navbar-expand-md navbar-light px-0">
					<Link to="/">Homeww</Link>
					<Link to="about">About</Link>
					<Link to="blog">Blog</Link>
				</nav>
			</div>
		</div>
	</header>test
	<div>
		<Route path="blog" component="{Blog}" />
		<Route path="pages" component="{Pages}" />
		<Route path="/">
			<Dashboard />
		</Route>
	</div>
</Router>