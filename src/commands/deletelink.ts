import {Command, CommandOption, Bot, CommandPermissions} from "../classes/Bot";
import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    /*PermissionsBitField*/
} from "discord.js";
import DB from "../classes/DB";
import Utils from "../classes/Utils";

export default class extends Command {
    override async run(interaction: ChatInputCommandInteraction, bot: Bot): Promise<void> {
        await interaction.deferReply({ephemeral: true});
        let domain = interaction.options.getString("domain")!;
        try {
            await DB.deleteDomain(interaction.guildId!, interaction.options.getString("domain")!, interaction.options.getString("group")!);
        } catch (e) {
            await interaction.editReply({ embeds: [ Utils.getEmbed(0xff0000, { title: `Failed to remove the link`, description: e!.toString() }) ] });
            return;
        }
        await interaction.editReply({ embeds: [ Utils.getEmbed(0x814fff, { title: `Success`, description: `Removed ${domain} from group \`${interaction.options.getString("group")}\`.`}) ]});

        await Utils.sendWebhook(interaction.guildId!, 2, [
            Utils.getEmbed(0x814fff, {
                title: `Link Removed`,
                fields: [
                    {
                        name: "Link",
                        value: interaction.options.getString("domain")!,
                    },
                    {
                        name: "Group",
                        value: interaction.options.getString("group")!,
                    },
                    {
                        name: "Added By",
                        value: `<@${interaction.user.id}> (${interaction.user.tag} | ${interaction.user.id})`,
                    },
                ]
            })
        ])
    }

    override name(): string {
        return "deletelink";
    }

    override description(): string {
        return "Delete a link from the bot";
    }

    override options(): CommandOption[] {
        return [{
            name: "domain",
            description: "The domain to delete",
            type: ApplicationCommandOptionType.String,
            required: true
            },
            {
                name: "group",
                description: "The group to delete from",
                type: ApplicationCommandOptionType.String,
                required: true
            }]
    }

    override permissions(): CommandPermissions {
        return {
            dmUsable: false,
            //permissions: PermissionsBitField.Flags.ManageGuild,
        }
    }

}