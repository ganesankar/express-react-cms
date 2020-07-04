<script>
  import { Router, Link, Route } from "svelte-routing";
  import Dashboard from "./pages/dashboard.svelte";
  import Pages from "./pages/pages.svelte";
  import Blog from "./pages/blog.svelte";
 
  export let url = "";
</script> 
 
<Router url="{url}">
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="blog">Blog</Link>
  </nav>
  test
  <div>
  
    <Route path="blog" component="{Blog}" />
    <Route path="pages" component="{Pages}" />
    <Route path="/"><Dashboard /></Route>
  </div>
</Router>