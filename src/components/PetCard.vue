<template>
  <div>
    <a-dropdown>
        <a class="ant-dropdown-link" href="#"> Hover me <a-icon type="down" /> </a>
        <a-menu slot="overlay">
        <a-menu-item>
            <a href="javascript:;">1st menu item</a>
        </a-menu-item>
        <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
        </a-menu-item>
        <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
        </a-menu-item>
        </a-menu>
    </a-dropdown>
    <a-card size="small" title="阿滑" class="card_block">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" href="#">
          Click me
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item key="0">0</a-menu-item>
          <a-menu-item key="1">1</a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">3rd menu item</a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-card>

    <!-- <a-card size="small" title="阿圓" class="card_block">
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>
    <a-card size="small" title="Small size card" class="card_block">
      <a href="#" slot="extra">more</a>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>
    <a-card size="small" title="Small size card" class="card_block">
      <a href="#" slot="extra">more</a>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>
    <a-card size="small" title="Small size card" class="card_block">
      <a href="#" slot="extra">more</a>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>
    <a-card size="small" title="Small size card" class="card_block">
      <a href="#" slot="extra">more</a>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>-->
  </div>
</template>

<script>
export default {
  name: "petCard",
  data() {
    return {
      feed: ""
    };
  }
};
</script>

<style lang="sass" scoped>
    $fz-color: rgba(0,0,0,.4)

    .card_block
        background-color: #fff
        border-radius: 15px
        padding: 8px 12px
        text-align: left
        letter-spacing: 2px
        font-size: 15px
        color: $fz-color
        font-weight: 700
        font-family: '微軟正黑體'

</style>