<template>
  <div class="about text-center">
    <h1>AZStrut</h1>
    <div class="row justify-content-center">
        <div class="col">
            <button type="button" rel="tooltip" title=""
                class="btn btn-danger btn-round"
                data-original-title="Remove"
                @click="$router.push({path: '/login'})">
                Login
            </button>
        </div>
        <div class="col">
            <button type="button" rel="tooltip" title=""
                class="btn btn-danger btn-round"
                data-original-title="Remove"
                @click="$router.push({path: '/register'})">
                Register
            </button>
        </div>
        <div class="col">
            <button type="button" rel="tooltip" title=""
                class="btn btn-danger btn-round"
                data-original-title="Remove"
                @click="$router.push({path: '/administrator/dashboard'})">
                Administrator Dash
            </button>
        </div>
    </div>
  </div>
</template>
<script>
import { Button } from 'element-ui';

export default {
    
}
</script>

