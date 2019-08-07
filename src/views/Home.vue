<template>
  <div class="about text-center">
    <h1>AZStrut</h1>
    <div class="row justify-content-center">
        <button type="button" rel="tooltip" title=""
            class="btn btn-danger btn-round"
            data-original-title="Remove"
            @click="$router.push({path: '/login'})">
            Login
        </button>
    </div>
  </div>
</template>
<script>
import { Button } from 'element-ui';

export default {
    
}
</script>

