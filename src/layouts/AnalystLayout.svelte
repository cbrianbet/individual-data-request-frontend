<script>
  import { Router, Route } from 'svelte-routing';

  // components for this layout
  import AnalystNavbar from 'components/Navbars/AnalystNavbar.svelte';
  import AnalystHeaderStats from 'components/Headers/AnalystHeaderStats.svelte';
  import AnalystSidebar from 'components/Sidebar/AnalystSidebar.svelte';

  // pages for this layout
  import AnalystTabs from "components/Tabs/AnalystTabs.svelte";
  import RequestDetails from 'views/analyst/RequestDetails.svelte';

  export let location;
</script>

<div>
  <AnalystSidebar {location} />
  <div class="relative md:ml-64 bg-blueGray-100">
    <AnalystNavbar />
    <AnalystHeaderStats />
    <div class="px-4 md:px-10 mx-auto w-full -m-24">
      <Router url="analyst">
        <Route path="list" component={AnalystTabs} />
        <Route path="request" component={RequestDetails} />
      </Router>
    </div>
  </div>
</div>
