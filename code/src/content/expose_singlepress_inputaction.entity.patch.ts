import { getPath, IPath, type QNPatch } from "quickentity-script"

export const TARGET: IPath = {
	...getPath(
		"[assembly:/_pro/design/gamecore/setpiecehelpers.template?/setpiecehelpers_activator_singlepress.entitytemplate]"
	)
}
export const NAME: string = "expose_singlepress_inputaction"

export async function create(patch: QNPatch, option?: string) {
	patch.getEntity("cecdc1465dd13fbb").addPropertyAliasConnection("m_eInputAction", {
		originalProperty: "m_eInputAction",
		originalEntity: "b6dba39a251bfef1"
	})
}
