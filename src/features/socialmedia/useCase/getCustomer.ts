import axios from 'axios';
import { DISCORD_API_URL, DISCORD_GUILD_ID } from '../../../constants';

export const getCustomer = async (customerAccessToken: string) => {
    try {
        const customer = await axios.get(`${DISCORD_API_URL}/users/@me`, {
            headers: {
                Authorization: `Bearer ${customerAccessToken}`,
            },
        });

        const {
            id,
            username,
            avatar,
            global_name: globalName,
            email,
        } = customer.data;

        const guilds: any = await axios.get(
            `${DISCORD_API_URL}/users/@me/guilds`,
            {
                headers: {
                    Authorization: `Bearer ${customerAccessToken}`,
                    Accept: 'application/json',
                },
            }
        );
        const isFuriaGuild = guilds.data.some(
            (guild: any) => guild.id === DISCORD_GUILD_ID
        );

        return {
            id,
            username,
            avatar,
            globalName,
            email,
            isFuriaGuild,
        };
    } catch (error) {
        throw new Error(`Failed to fetch customer data: ${error}`);
    }
};
