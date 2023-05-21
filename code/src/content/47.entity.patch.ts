import { CommonPaths, CommonRoots, IPath, getClassPath, type QNPatch, getPath } from "quickentity-script"
import type { TOption } from "../types.js"
import { normalizeToHash } from "repository-script"

export const TARGET: IPath = { ...CommonPaths.Agent47 }
export const NAME: string = "47"
export const OPTIONS: TOption[] = [
	"DragDropBody",
	"Reload",
	"Surrender",
	"TakeDisguise",
	"InstinctMode",
	"CamSwitch",
	"SneakToggle"
]

export async function create(patch: QNPatch, option?: string) {
	const root = patch.addEntity({ ...CommonPaths.Entity, parent: CommonRoots.Agent47 })
	const isAiming = root.addBool(false)

	root.addChild({
		...getClassPath("LookAtAimSoundController"),
		events: {
			EnterLookAt: {
				SetTrue: isAiming
			},
			ExitLookAt: {
				SetFalse: isAiming
			}
		}
	})

	root.addChild({
		...getPath(
			"[assembly:/_pro/design/gamecore/setpiecehelpers.template?/setpiecehelpers_activator_singlepress.entitytemplate]"
		),
		properties: {
			m_mTransform: {
				type: "SMatrix43",
				value: {
					position: {
						x: 0,
						y: 0,
						z: 0
					},
					rotation: {
						x: 0,
						y: 0,
						z: 0
					}
				}
			},
			m_sId: {
				type: "ZGuid",
				value: "37d4e28d-fb2e-4377-9a64-88dfbb6c9ef0"
			},
			name_metricvalue: {
				type: "ZString",
				value: "47_Dialog_Activated"
			},
			m_bApplyPromptDescriptionText: {
				type: "bool",
				value: false
			},
			m_bRequiresHitmanFacing: {
				type: "bool",
				value: false
			},
			m_bActionHasValidDisguise: {
				type: "bool",
				value: false
			},
			m_bValueuseonce: {
				type: "bool",
				value: false
			},
			m_eidParent: {
				type: "SEntityTemplateReference",
				value: CommonRoots.Agent47
			},
			m_aValuesusable: {
				type: "TArray<SEntityTemplateReference>",
				value: [isAiming]
			},
			m_bIsIllegal: {
				type: "bool",
				value: false
			},
			m_rPromptTextPassiveResource: {
				type: "ZRuntimeResourceID",
				value: {
					resource: normalizeToHash("[assembly:/_pro/bsh/ghost_emotes/ghost_emotes].text"),
					flag: "5F"
				}
			},
			m_fOverrideInteractionRangeValue: {
				type: "float32",
				value: 10
			},
			m_bOverrideInteractionRange: {
				type: "bool",
				value: true
			},
			m_sPromptDescriptionText: {
				type: "ZString",
				value: ""
			},
			m_sPromptText: {
				type: "ZString",
				value: ""
			},
			m_rPromptTextResource: {
				type: "ZRuntimeResourceID",
				value: {
					resource: normalizeToHash("[assembly:/_pro/bsh/ghost_emotes/ghost_emotes].text"),
					flag: "5F"
				}
			},
			m_bRequiresHitmanInFront: {
				type: "bool",
				value: false
			},
			m_aPromptPositions: {
				type: "TArray<SEntityTemplateReference>",
				value: [
					{
						ref: root.addChild({
							...getPath(
								"[assembly:/_pro/design/gamecore/setpiecehelpers.template?/setpiecehelpers_interactionspatialsandgizmos.entitytemplate]"
							),
							properties: {
								m_mTransform: {
									type: "SMatrix43",
									value: {
										position: {
											x: 0,
											y: 0,
											z: 0
										},
										rotation: {
											x: 0,
											y: 0,
											z: 0
										}
									}
								},
								InteractionPoint: {
									type: "SMatrix43",
									value: {
										position: {
											x: -0.5,
											y: -1,
											z: 1.25
										},
										rotation: {
											x: 0,
											y: 0,
											z: 0
										}
									}
								},
								PromptPoint: {
									type: "SMatrix43",
									value: {
										position: {
											x: 0,
											y: 0,
											z: 0
										},
										rotation: {
											x: 0,
											y: 0,
											z: 0
										}
									}
								},
								m_eidParent: {
									type: "SEntityTemplateReference",
									value: CommonRoots.Agent47
								}
							}
						}),
						externalScene: null,
						exposedEntity: "PromptSpatial"
					}
				],
				postInit: true
			},
			m_aValuesvisible: {
				type: "TArray<SEntityTemplateReference>",
				value: [isAiming],
				postInit: true
			},
			m_eInputAction: {
				type: "EHM5GameInputFlag",
				value: `eGameInput${option}`
			}
		},
		events: {
			Completed: {
				Open: root.addChild({
					...getClassPath("OpenMenuPageEntity"),
					properties: {
						m_sPageName: {
							type: "ZString",
							value: "emotemenu"
						},
						m_eMenu: {
							type: "EGameUIMenu",
							value: "eUIMenu_EmoteMenu"
						}
					}
				})
			}
		}
	})
}
