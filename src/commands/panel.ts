import { Command, CommandOption, Bot } from "../classes/Bot";
import {CommandInteraction, ActionRowBuilder, ButtonBuilder} from "discord.js";
import s from "../assets/en_US.json" assert { type: "json" };
let m = s.strings.panel;
export default class extends Command {
    override async run(interaction: CommandInteraction, bot: Bot): Promise<void> {
        await interaction.deferReply({ephemeral: true});

        await interaction.channel!.send({
            embeds: [
                {
                    color: 0x780aff,
                    title: m.embed_title,
                    description: m.embed_description,
                    footer: {
                        text: s.strings.footer,
                        icon_url: bot.client.user!.displayAvatarURL({forceStatic: true, size: 128, extension: "png"})
                    }
                },
            ],
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .addComponents([bot.getButton("paneldispensebtn")?.build()!, bot.getButton("panelreportbtn")?.build()!])
            ]
        })

        await interaction.editReply({
            content: m.reply_content,
        })
    }

    override name(): string {
        return "panel";
    }

    override description(): string {
        return "Create a dispenser panel";
    }

    override options(): CommandOption[] {
        return []
    }
}