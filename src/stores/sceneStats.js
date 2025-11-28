import {
  GeomItem,
  CADBody,
  CADPart,
  PMIItem,
  MeshProxy,
  LinesProxy,
  CompoundGeom,
  InstanceItem,
  CADAssembly,
  CADAsset,
  XRef,
} from '@zeainc/zea-engine'

const collectSceneStats = (root) => {
  const bbox = root.boundingBoxParam.value
  const sceneStats = {
    BBoxP0: bbox.p0.toString(),
    BBoxP1: bbox.p1.toString(),
    ASSETS: 0,
    MATERIALS: 0,
    GEOMS: 0,
    ASSEMBLIES: 0,
    INSTANCE_ITEMS: 0,
    XREFS: 0,
    PARTS: 0,
    BODIES: 0,
    GEOMITEMS: 0,
    DRAWN_TRIANGLES: 0,
    DRAWN_LINES: 0,
  }
  root.traverse((item) => {
    if (item instanceof PMIItem) {
      return false
    }
    if (item instanceof CADAsset) {
      sceneStats.ASSETS++
      sceneStats.GEOMS += item.geomLibrary.getNumGeoms()
      sceneStats.MATERIALS += item.materialLibrary.getNumMaterials()
    } else if (item instanceof CADAssembly) {
      sceneStats.ASSEMBLIES++
    } else if (item instanceof CADPart) {
      sceneStats.PARTS++
    } else if (item instanceof InstanceItem) {
      sceneStats.INSTANCE_ITEMS++
    } else if (item instanceof XRef) {
      sceneStats.XREFS++
    } else if (item instanceof GeomItem) {
      sceneStats.GEOMITEMS++
      if (item instanceof CADBody) {
        sceneStats.BODIES++
      }
      const geom = item.geomParam.value
      if (geom) {
        if (geom instanceof CompoundGeom) {
          sceneStats.DRAWN_TRIANGLES += geom.getNumTriangles()
          sceneStats.DRAWN_LINES += geom.getNumLineSegments()
        } else if (geom instanceof MeshProxy) {
          sceneStats.DRAWN_TRIANGLES += geom.getNumTriangles()
        } else if (geom instanceof LinesProxy) {
          sceneStats.DRAWN_LINES += geom.getNumLineSegments()
        }
      }
    }
  })

  console.log(sceneStats)
  return sceneStats
}

export { collectSceneStats }
