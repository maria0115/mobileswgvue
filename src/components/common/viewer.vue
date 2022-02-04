<template>
  <Download
    v-if="this.Option().attach === 'download'&&attach"
    :attaInfo="attaInfo"
    :attach="attach"
    ref="editor"
    :className="className"
  />
  <Sat
    v-else-if="isOption('sat')"
    :attaInfo="attaInfo"
    ref="editor"
    :attach="attach"
    :className="className"
  />
  <Synap
    v-else-if="isOption('synap')"
    :attaInfo="attaInfo"
    ref="editor"
    :unid="unid"
    :attach="attach"
    :className="className"
  />
</template>

<script>
import Sat from "@/components/editor/sat.vue";
import Synap from "@/components/editor/synapv.vue";
import Download from "@/components/editor/download.vue";
export default {
  created(){
  },
  props: ["attach", "className", "attaInfo","unid"],
  components: {
    Sat,
    Synap,
    Download,
  },
  methods: {
    isOption(value) {
      var boo = false;
      this.attach
        ? (boo = this.Option().attach === value)
        : (boo = this.Option().viewer === value);
      return boo;
    },
  },
};
</script>

<style>
</style>